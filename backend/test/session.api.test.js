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

const app = require('../app');
const request = require('supertest');
const session = require('supertest-session');
import connectParam from "./connectParam";

let queryParam = {
    cmd: 'MATCH(a:person)-[e] ->(b) return a, e, b limit 10',
};

describe('Cypher Api Test', () => {
    const globalRequest = request(app);
    const globalSession = session(app);
    const globalSession2 = session(app);

    let connectorUrl = '/api/v1/db';
    let cypherUrl = '/api/v1/cypher';

    it('Test Session 1', (done) => {
        globalRequest
            .post(`${connectorUrl}/connect`)
            .send(connectParam)
            .expect(200)
            .end((err, res) => {
                if (err) done(err);
                done();
            });
    });

    it('Test Session 2 ', (done) => {
        globalSession
            .post(`${connectorUrl}/connect`)
            .send(connectParam)
            .expect(200)
            .end((err, res) => {
                if (err) done(err);
                done();
            });
    });

    it('Test Session 3 ', (done) => {
        globalSession
            .post(`${cypherUrl}`)
            .send(queryParam)
            .expect(200)
            .end((err, res) => {
                if (err) done(err);
                done();
            });
    });
});
