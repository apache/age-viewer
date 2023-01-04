/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import { getQuery } from "../tools/SQLFlavorManager";
import * as util from "util";
import GraphRepository from '../models/GraphRepository';
import { start } from "repl";
import { get } from "http";

class DatabaseService {
    constructor() {
        this._graphRepository = null;
    }

    async getMetaData(graphName) {
        let gr = this._graphRepository;
        await gr.initGraphNames();
        const { graphs } = gr.getConnectionInfo();
        await DatabaseService.analyzeGraph(gr);
        if (graphName) {
            if (graphs.includes(graphName.currentGraph)) {
                return await this.getMetaDataSingle(graphName.currentGraph, graphs);
            } else {
                return await this.getMetaDataSingle(gr._graph, graphs);
            }
        } else if (graphs.length > 0) {
            return await this.graphNameInitialize(graphs);
        } else {
            throw new Error('graph does not exist');
            // return await this.getMetaDataMultiple(graphs);
        }
    }

    // async getMetaDataMultiple(graphs){
    //     const metadata = {};
    //     await Promise.all(graphs.map(async(gname)=>{
    //         metadata[gname] = await this.getMetaDataSingle(gname);
    //     }))
    //     return metadata;
    // }

    async getMetaDataSingle(curGraph, graphs) {
        let metadata = {};
        let data = {};
        const { database } = this.getConnectionInfo();
        try {
            let { nodes, edges } = await this.readMetaData(curGraph);
            data.nodes = nodes;
            data.edges = edges;
            data.propertyKeys = await this.getPropertyKeys();
            data.graph = curGraph;
            data.database = database;
            data.role = await this.getRole();
            graphs.forEach((gname) => {
                if (gname !== curGraph) metadata[gname] = {};
                else metadata[gname] = data;
            })
        } catch (error) {
            throw error;
        }
        return metadata;
    }

    async graphNameInitialize(graphs) {
        let metadata = {};
        graphs.forEach((gname) => {
            metadata[gname] = {};
        })
        return metadata;
    }

    async getGraphLabels() {
        let graphRepository = this._graphRepository;
        let queryResult = {};
        try {
            queryResult = await graphRepository.execute(getQuery('graph_labels'), [this.getConnectionInfo().graph]);
        } catch (error) {
            throw error;
        }

        return queryResult.rows;
    }

    async getGraphLabelCount(labelName, labelKind) {
        let graphRepository = this._graphRepository;
        let query = null;

        if (labelKind === 'v') {
            query = util.format(getQuery('label_count_vertex'), `${this.getConnectionInfo().graph}.${labelName}`);
        } else if (labelKind === 'e') {
            query = util.format(getQuery('label_count_edge'), `${this.getConnectionInfo().graph}.${labelName}`);
        }

        let queryResult = await graphRepository.execute(query);

        return queryResult.rows;
    }

    static async analyzeGraph(gr) {
        await gr.execute(getQuery('analyze_graph'));
    }

    async readMetaData(graphName) {
        let gr = this._graphRepository;
        const { version } = gr.getConnectionInfo();
        let queryResult = await gr.execute(util.format(getQuery('meta_data', version.split('.')[0]), graphName));
        return this.parseMeta(queryResult.rows);
    }

    async getPropertyKeys() {
        let graphRepository = this._graphRepository;
        let queryResult = await graphRepository.execute(getQuery('property_keys'));
        return queryResult.rows;
    }

    async getRole() {
        let graphRepository = this._graphRepository;
        let queryResult = await graphRepository.execute(getQuery('get_role'), [this.getConnectionInfo().user]);
        return queryResult.rows[0];
    }

    async connectDatabase(connectionInfo) {
        let graphRepository = this._graphRepository;
        if (graphRepository == null) {
            this._graphRepository = new GraphRepository(connectionInfo);
            graphRepository = this._graphRepository;
        }

        try {
            let client = await graphRepository.connect();
            client.release();
        } catch (e) {
            this._graphRepository = null;
            throw e;
        }
        return true;
    }

    async disconnectDatabase() {
        let graphRepository = this._graphRepository;
        if (graphRepository == null) {
            console.log('Already Disconnected');
            return false;
        } else {
            let isRelease = await this._graphRepository.releaseConnection();
            if (isRelease) {
                this._graphRepository = null;
                return true;
            } else {
                console.log('Failed releaseConnection()');
                return false;
            }
        }
    }

    async getConnectionStatus() {
        let graphRepository = this._graphRepository;
        if (graphRepository == null) {
            return false;
        }

        try {
            let client = await graphRepository.getConnection();
            client.release();
        } catch (err) {
            return false;
        }
        return true;
    }

    getConnectionInfo() {
        if (this.isConnected() === false)
            throw new Error("Not connected");
        return this._graphRepository.getConnectionInfo();
    }

    isConnected() {
        return this._graphRepository != null;
    }

    get graphRepository() {
        return this._graphRepository;
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
    parseMeta(data) {
        const meta = {
            edges: [],
            nodes: []
        };
        const vertex_name = '_ag_label_vertex';
        const edge_name = '_ag_label_edge';

        data.forEach((element, index) => {
            if (element.name === vertex_name || element.name === edge_name) {
                return;
            }

            if (element.kind === 'v') meta.nodes.push(element);
            if (element.kind === 'e') meta.edges.push(element);
        });
        return meta;
    }
}

module.exports = DatabaseService;