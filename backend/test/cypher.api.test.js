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
const assert = require('assert').strict;
import connectParam from './connectParam';

let queryParam = {
    cmd: 'MATCH(a:person)-[e] ->(b) return a, e, b limit 10',
};

let wrongQueryParam = {
    cmd: 'MATCH(a:rating)-[e] ->(b) return a, e, b limit 10',
};

describe('Cypher Api Test', () => {
    let dbUrl = '/api/v1/db';
    let cypherUrl = '/api/v1/cypher';

    it('Test Match API', (done) => {
        request(app)
            .post(`${cypherUrl}/`)
            .send(queryParam)
            .expect('Content-Type', /json/)
            .expect(500)
            .end((err, res) => {
                if (err) {
                    done(err);
                }
                console.log(res.body);
                done();
            });
    });

    describe('Test Session', () => {
        const sessionRequest = session(app);
        before(function (done) {
            sessionRequest
                .post(`${dbUrl}/connect`)
                .send(connectParam)
                .expect('Content-Type', /json/)
                .expect(200)
                .end((err, res) => {
                    if (err) done(err);
                    assert(res.body, connectParam);
                    done();
                });
        });
        it('Test connect cypher', (done) => {
            sessionRequest
                .post(`${cypherUrl}/`)
                .send(queryParam)
                .expect('Content-Type', /json/)
                .expect(200)
                .end((err, res) => {
                    if (err) {
                        done(err);
                    }
                    if (!res.body.message) {
                        console.log(res.body)
                        assert(res.body.rows.length == 10);
                        assert(res.body.columns.length == 3);
                    } else {
                        console.log(res.body.message);
                    }
                    done();
                });
        });
        it('Test wrong cypher', (done) => {
            sessionRequest
                .post(`${cypherUrl}/`)
                .send(wrongQueryParam)
                .expect('Content-Type', /json/)
                .expect(500)
                .end((err, res) => {
                    if (err) {
                        done(err);
                    }
                    assert(!!res.body.message);
                    console.log(res.body.message);
                    done();
                });
        });
    });
});
