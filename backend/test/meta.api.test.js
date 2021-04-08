const app = require('../app');
const request = require('supertest');
const session = require('supertest-session');
const assert = require('assert').strict;
import connectParam from "./connectParam";

describe('MetaAPI Test', () => {

    let mappingUrl = '/api/v1/db';

    describe('Execute Meta', () => {
        const sessionRequest = session(app);
        before(function (done) {
            sessionRequest
                .post(`${mappingUrl}/connect`)
                .send(connectParam)
                .expect('Content-Type', /json/)
                .expect(200)
                .end((err, res) => {
                    if (err) done(err);
                    assert(res.body, connectParam);
                    return done();
                });
        });
        it('Get Metachart', (done) => {
            sessionRequest
                .get(`${mappingUrl}/metaChart`)
                .expect('Content-Type', /json/)
                .expect(200)
                .end((err, res) => {
                    if (err) done(err);
                    console.log(res.body);
                    assert(!!res.body);
                    done();
                });
        });
    });

});
