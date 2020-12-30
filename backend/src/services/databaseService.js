const sessionManager = require('./sessionService');
const AgensGraphRepository = require('../models/agensgraph/agensGraphRepository');

class ConnectorService {
    constructor() {}

    async getMetaData() {
        let metadata = new Object();
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

        try {
            await agensDatabaseHelper.isHealth();
            return true;
        } catch(err) {
            this._agensDatabaseHelper = null;
            throw err;
        }
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
        if(agensDatabaseHelper == null) {
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
        return this._agensDatabaseHelper.getConnectionInfo();
    }

    isConnected() {
        return this._agensDatabaseHelper != null;
    }

    get agensDatabaseHelper() {
        return this._agensDatabaseHelper;
    }

    convertEdge({ label, id, start, end, props }) {
        return {
            label: label,
            id: `${id.oid}.${id.id}`,
            start: `${start.oid}.${start.id}`,
            end: `${end.oid}.${end.id}`,
            properties: props,
        };
    }

    convertVertex({ label, id, props }) {
        return {
            label: label,
            id: `${id.oid}.${id.id}`,
            properties: props,
        };
    }
}

module.exports = ConnectorService;
