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

export function stringWrap(valstr, flavor) {
    return JSON.stringify(valstr);
}

export function JsonStringify(flavor, record) {
    let ageJsonStr = '{';
    let isFirst = true;
    for (const [key, value] of Object.entries(record)) {
        if (!isFirst) {
            ageJsonStr = ageJsonStr + ',';
        }
        let valueWrapped = stringWrap(value, flavor);
        ageJsonStr = ageJsonStr + `${key}:${valueWrapped}`;
        isFirst = false;
    }
    ageJsonStr = ageJsonStr + '}';
    return ageJsonStr;
}

export async function createVertex(client, graphPathStr, label, record, flavor) {
    const createQ = `CREATE (n:${label} ${JsonStringify(flavor, record)})`;
    if (flavor === 'AGE') {
        return AGECreateVertex(client, graphPathStr, createQ);
    } else {
        throw new Error(`Unknown flavor ${flavor}`)
    }
}

async function AGECreateVertex(client, graphPathStr, createQ) {
    await client.query(
        `select *
         from cypher('${graphPathStr}', $$ ${createQ} $$) as (a agtype)`);
}

export async function createEdge(client, label, record, graphPathStr, edgeStartLabel, edgeEndLabel, startNodeName, endNodeName, flavor) {
    const createQ = `CREATE (:${edgeStartLabel} {name: ${stringWrap(startNodeName, flavor)}})-[n:${label} ${JsonStringify(flavor, record)}]->(:${edgeEndLabel} {name: ${stringWrap(endNodeName, flavor)}})`;
    if (flavor === 'AGE') {
        return AGECreateEdge(client, graphPathStr, createQ);
    } else {
        throw new Error(`Unknown flavor ${flavor}`)
    }
}

async function AGECreateEdge(client, graphPathStr, createQ) {
    await client.query(
        `select *
         from cypher('${graphPathStr}', $$ ${createQ} $$) as (a agtype)`);
}
