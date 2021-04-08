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
