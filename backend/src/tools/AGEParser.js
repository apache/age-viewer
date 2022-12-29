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

import antlr4 from 'antlr4';
import { cli } from 'winston/lib/winston/config';
import AgtypeLexer from './AgtypeLexer';
import AgtypeParser from './AgtypeParser';
import CustomAgTypeListener from './CustomAgTypeListener';

function AGTypeParse(input) {
    const chars = new antlr4.InputStream(input);
    const lexer = new AgtypeLexer(chars);
    const tokens = new antlr4.CommonTokenStream(lexer);
    const parser = new AgtypeParser(tokens);
    parser.buildParseTrees = true;
    const tree = parser.agType();
    const printer = new CustomAgTypeListener();
    antlr4.tree.ParseTreeWalker.DEFAULT.walk(printer, tree);
    return printer.getResult();
}

async function setAGETypes(client, types) {
    await client.query(`
        CREATE EXTENSION IF NOT EXISTS age;
        LOAD 'age';
        SET search_path = ag_catalog, "$user", public;
    `)

    const oidResults = await client.query(`
        select typelem
        from pg_type
        where typname = '_agtype';`);

    if (oidResults.rows.length < 1)
        throw new Error();

    types.setTypeParser(oidResults.rows[0].typelem, AGTypeParse)
}

async function onConnectQueries(client){
    const v = await client.query('show server_version;');
    return {server_version: v.rows[0].server_version};
}

export {setAGETypes, AGTypeParse, onConnectQueries}
