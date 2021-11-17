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

import sessionService from "../services/sessionService";
import {parse} from "csv/lib/sync";
import {createEdge, createVertex} from "../util/JsonBuilder";

class FeatureController {
    async uploadCSV(req, res, next) {
        let connectorService = sessionService.get(req.sessionID);
        if (!connectorService.isConnected()) {
            res.status(500).json({}).end();
            return;
        }
        const records = parse(req.file.buffer.toString(), {
            columns: true,
            skip_empty_lines: true
        });
        const fileName = req.file.originalname.substr(0, req.file.originalname.length - 4);
        let isVertices = true;
        if (records[0].hasOwnProperty('start_node') && records[0].hasOwnProperty('end_node')) {
            isVertices = false;
        }
        const client = await connectorService._agensDatabaseHelper.getConnection();
        if (isVertices) {
            try {
                for (const record of records) {
                    await createVertex(client, connectorService.agensDatabaseHelper._graph, fileName, record, connectorService.agensDatabaseHelper.flavor);
                }
            } catch (e) {
                res.status(500).json({}).end();
                return;
            } finally {
                await client.release();
            }
            res.status(200).json({}).end();
        } else {
            const brkStart = fileName.indexOf('[');
            const brkEnd = fileName.indexOf(']');
            const ampersand = fileName.indexOf('&');
            const edgeLabel = fileName.substring(0, brkStart);
            const edgeStart = fileName.substring(brkStart + 1, ampersand);
            const edgeEnd = fileName.substring(ampersand + 1, brkEnd);

            try {
                for (const recordRoot of records) {
                    const {start_node, end_node, ...record} = recordRoot;
                    await createEdge(client, edgeLabel, record, connectorService.agensDatabaseHelper._graph, edgeStart, edgeEnd, start_node, end_node, connectorService.agensDatabaseHelper.flavor);
                }
            } catch (e) {
                res.status(500).json({}).end();
                return;
            } finally {
                await client.release();
            }
            res.status(200).json({}).end();
        }
    }
}

export default FeatureController;
