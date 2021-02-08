/*
 * Copyright 2020 Bitnine Co., Ltd.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const AgensGraphRepository = require('../models/agensgraph/agensGraphRepository');

class DatabaseService {
    constructor() {
        this._agensDatabaseHelper = null;
    }

    async getMetaData() {
        let metadata = {};
        try {
            let connectionInfo = this.getConnectionInfo();
            metadata.nodes = await this.getNodes();
            metadata.edges = await this.getEdges();
            metadata.propertyKeys = await this.getPropertyKeys();
            metadata.graph = connectionInfo.graph;
            metadata.database = connectionInfo.database;
            metadata.role = await this.getRole();
        } catch (error) {
            throw error;
        }
        return metadata;
    }

    async getGraphLabels() {
        let agensDatabaseHelper = this._agensDatabaseHelper;
        let queryResult = {};
        try {
            let query = [];
            query.push("SELECT l.labid as la_oid, l.labname as la_name, l.labkind as la_kind");
            query.push("FROM PG_CATALOG.AG_LABEL l");
            query.push("INNER JOIN PG_CATALOG.AG_GRAPH g ON g.oid = l.graphid");
            query.push("WHERE g.graphname = $1");
            query.push("and l.labname not in ('ag_vertex', 'ag_edge')");

            queryResult = await agensDatabaseHelper.execute(query.join('\n'), [this.getConnectionInfo().graph]);
        } catch (error) {
            throw error;
        }

        return queryResult.rows;
    }

    async getGraphLabelCount(labelName, labelKind) {
        let agensDatabaseHelper = this._agensDatabaseHelper;
        let query = [];

        if (labelKind === 'v') {
            query.push('SELECT COUNT(1) AS la_count');
            query.push('FROM ' + this.getConnectionInfo().graph + "." + labelName);
        } else if (labelKind === 'e') {
            query.push('SELECT SPLIT_PART(start::text, \'.\', 1) AS la_start, SPLIT_PART("end"::text, \'.\', 1) AS la_end, COUNT(1) AS la_count');
            query.push('FROM ' + this.getConnectionInfo().graph + "." + labelName);
            query.push('GROUP BY SPLIT_PART(start::text, \'.\', 1), SPLIT_PART("end"::text, \'.\', 1)');
        }

        let queryResult = await agensDatabaseHelper.execute(query.join('\n'));

        return queryResult.rows;
    }

    async getNodes() {
        let agensDatabaseHelper = this._agensDatabaseHelper;
        let query = [];
        query.push("MATCH(v) RETURN DISTINCT '*' AS label, count(v) AS cnt");
        query.push('UNION ALL');
        query.push('MATCH(v) RETURN DISTINCT label(v) AS label, count(v) AS cnt');
        query.push('ORDER BY label');

        let queryResult = await agensDatabaseHelper.execute(query.join('\n'));
        return queryResult.rows;
    }

    async getEdges() {
        let agensDatabaseHelper = this._agensDatabaseHelper;
        let query = [];
        query.push("MATCH(v) - [e] - (v2) RETURN DISTINCT '*' AS label, count(e) AS cnt");
        query.push('UNION ALL');
        query.push('MATCH(v) - [e] - (v2) RETURN DISTINCT label(e) AS label, count(e) AS cnt');
        query.push('ORDER BY label');

        let queryResult = await agensDatabaseHelper.execute(query.join('\n'));
        return queryResult.rows;
    }

    async getPropertyKeys() {
        let agensDatabaseHelper = this._agensDatabaseHelper;
        let query = [];
        query.push('MATCH(v)');
        query.push("RETURN DISTINCT jsonb_object_keys(v) AS key, 'v' AS key_type");
        query.push('UNION ALL');
        query.push('MATCH(v1) - [e] - (v2)');
        query.push("RETURN DISTINCT jsonb_object_keys(e) AS key, 'e' AS key_type");

        let queryResult = await agensDatabaseHelper.execute(query.join('\n'));
        return queryResult.rows;
    }

    async getRole() {
        let agensDatabaseHelper = this._agensDatabaseHelper;
        let query = [];
        query.push('SELECT usename as user_name,');
        query.push('CASE WHEN usesuper THEN ');
        query.push("CAST('admin' AS pg_catalog.text)");
        query.push('ELSE');
        query.push("CAST('user' AS pg_catalog.text)");
        query.push('END role_name');
        query.push('FROM pg_catalog.pg_user');
        query.push('WHERE usename = $1');
        let queryResult = await agensDatabaseHelper.execute(query.join('\n'), [this.getConnectionInfo().user]);
        return queryResult.rows[0];
    }

    async connectDatabase(connectionInfo) {
        let agensDatabaseHelper = this._agensDatabaseHelper;
        if (agensDatabaseHelper == null) {
            this._agensDatabaseHelper = new AgensGraphRepository(connectionInfo);
            agensDatabaseHelper = this._agensDatabaseHelper;
        }

        const isHealth = await agensDatabaseHelper.isHealth();
        if (isHealth === false) {
            this._agensDatabaseHelper = null;
        }
        return isHealth;
    }

    async disconnectDatabase() {
        let agensDatabaseHelper = this._agensDatabaseHelper;
        if (agensDatabaseHelper == null) {
            console.log('Already Disconnected');
            return false;
        } else {
            let isRelease = await this._agensDatabaseHelper.releaseConnection();
            if (isRelease) {
                this._agensDatabaseHelper = null;
                return true;
            } else {
                console.log('Failed releaseConnection()');
                return false;
            }
        }
    }

    async getConnectionStatus() {
        let agensDatabaseHelper = this._agensDatabaseHelper;
        if (agensDatabaseHelper == null) {
            return false;
        }

        try {
            await agensDatabaseHelper.isHealth()
            return true;
        } catch (err) {
            throw err;
        }
    }

    getConnectionInfo() {
        if(this.isConnected() === false)
            throw new Error("Not connected");
        return this._agensDatabaseHelper.getConnectionInfo();
    }

    isConnected() {
        return this._agensDatabaseHelper != null;
    }

    get agensDatabaseHelper() {
        return this._agensDatabaseHelper;
    }

    convertEdge({label, id, start, end, props}) {
        return {
            label: label,
            id: `${id.oid}.${id.id}`,
            start: `${start.oid}.${start.id}`,
            end: `${end.oid}.${end.id}`,
            properties: props,
        };
    }

    convertVertex({label, id, props}) {
        return {
            label: label,
            id: `${id.oid}.${id.id}`,
            properties: props,
        };
    }
}

module.exports = DatabaseService;
