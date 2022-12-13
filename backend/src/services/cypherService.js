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

class CypherService {
    constructor(graphRepository) {
        this._graphRepository = graphRepository;
    }

    async executeCypher(query) {
        if (!query) {
            throw new Error('Query not entered!');
        } else {
            try {
                let resultSet = await this._graphRepository.execute(query);
                return this.createResult(resultSet);
            } catch (err) {
                throw err;
            }
        }
    }
    
    createResult(resultSet) {
        let result;

        let targetItem = resultSet;
        if (Array.isArray(resultSet)) {
            targetItem = resultSet.pop();
        }

        let cypherRow = targetItem.rows;
        result = {
            rows: cypherRow,
            columns: this._getColumns(targetItem),
            rowCount: this._getRowCount(targetItem),
            command: this._getCommand(targetItem),
        };
        return result;
    }

    _getColumns(resultSet) {
        return resultSet.fields.map((field) => field.name);
    }

    _getRowCount(resultSet) {
        return resultSet.rowCount;
    }

    _getCommand(resultSet) {
        return resultSet.command;
    }

    _convertRowToResult(resultSet) {
        return resultSet.rows.map((row) => {
            let convetedObject = {};
            for (let k in row) {
                if (row[k]) {
                    let typeName = row[k].constructor.name;
                    if (typeName === 'Path') {
                        convetedObject[k] = this.convertPath(row[k]);
                    } else if (typeName === 'Vertex') {
                        convetedObject[k] = this.convertVertex(row[k]);
                    } else if (typeName === 'Edge') {
                        convetedObject[k] = this.convertEdge(row[k]);
                    } else {
                        convetedObject[k] = row[k];
                    }
                } else {
                    convetedObject[k] = null;
                }
            }
            return convetedObject;
        });
    }

    convertPath({vertices, edges, start, end, len}) {
        let result = [];
        // vertex
        for (let idx in vertices) {
            result.push(this.convertVertex(vertices[idx]));
        }
        // edge
        for (let idx in edges) {
            result.push(this.convertEdge(edges[idx]));
        }

        return result;
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

module.exports = CypherService;
