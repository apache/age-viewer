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

import Flavors from '../../config/Flavors';
import PgConfig from '../../config/Pg'

require('@bitnine-oss/ag-driver');
import pg from 'pg';
import types from 'pg-types';
import {setAGETypes} from '../../tools/AGEParser';


class AgensGraphRepository {
    constructor({host, port, database, graph, user, password, flavor} = {}) {
        if (!flavor) {
            throw new Error('Flavor is required.');
        }

        this._host = host;
        this._port = port;
        this._database = database;
        this._graph = graph;
        this._user = user;
        this._password = password;
        this.flavor = flavor;
    }

    static async getConnection({
                                   host,
                                   port,
                                   database,
                                   graph,
                                   user,
                                   password,
                                   flavor
                               } = {},
                               closeConnection = true) {
        const client = new pg.Client({
                user,
                password,
                host,
                database,
                port,
            }
        )
        client.connect();
        if (flavor === Flavors.AGE) {
            await setAGETypes(client, types);
        } else if (flavor === Flavors.AGENS) {
            await client.query(`set graph_path = ${graph}`)
        } else {
            throw new Error(`Unknown flavor ${flavor}`)
        }

        if (closeConnection === true) {
            await client.end();
        }
        return client;
    }

    static newConnectionPool(poolConnectionConfig) {
        return new pg.Pool(poolConnectionConfig);
    }

    // Execute cypher query with params
    async execute(query, params = []) {
        let client = await this.getConnection();
        let result = null;
        try {
            result = await client.query(query, params);
        } catch (err) {
            throw err;
        } finally {
            client.release();
        }
        return result;
    }

    /**
     * Get connectionInfo
     */
    async getConnection() {
        if (!this._pool) {
            this._pool = AgensGraphRepository.newConnectionPool(this.getPoolConnectionInfo());
        }
        const client = await this._pool.connect();
        if (this.flavor === 'AGE') {
            await setAGETypes(client, types);
        } else {
            await client.query(`set graph_path = ${this._graph}`);
        }
        return client;
    }

    /**
     * Release connection
     */
    async releaseConnection() {
        try {
            await this._pool.end();
            return true;
        } catch (err) {
            throw err;
        }
    }

    /**
     * Get connection pool information
     */
    getPoolConnectionInfo() {
        if (!this._host || !this._port || !this._database) {
            return null;
        }
        return {
            host: this._host,
            port: this._port,
            database: this._database,
            user: this._user,
            password: this._password,
            max: PgConfig.max,
            idleTimeoutMillis: PgConfig.idleTimeoutMillis,
            connectionTimeoutMillis: PgConfig.connectionTimeoutMillis,
        };
    }

    /**
     * Get connection info
     */
    getConnectionInfo() {
        if (!this._host || !this._port || !this._database) {
            throw new Error("Not connected");
        }
        return {
            host: this._host,
            port: this._port,
            database: this._database,
            user: this._user,
            password: this._password,
            graph: this._graph,
            flavor: this.flavor,
        };
    }
}

module.exports = AgensGraphRepository;
