const app = require('../app');
const session = require('supertest-session');
const assert = require('assert').strict;

const request = session(app);
import connectParam from "./connectParam";

let dbUrl = '/api/v1/db';
let cypherUrl = '/api/v1/cypher';

let matchQuery = {cmd: 'match (v)-[r]->(v2) return * limit 1'};
let countQuery = {cmd: "MATCH(p:person) WHERE p.id = 'TEST' RETURN count(p)"};
let createQuery = {cmd: "CREATE(p:person {id: 'TEST'})"};
let deleteQuery = {cmd: "MATCH(p:person) WHERE p.id = 'TEST' DELETE p"};
let setQuery = {cmd: ''};

let pathQuery = {cmd: 'match p = (v)- [r]->(v2) return p limit 1;'};

let createTableQuery = {
    cmd:
        'create table categories (categoryid int, categoryname varchar(15), description text, picture bytea);' +
        'create table customers (customerid char(5), companyname varchar(40), contactname varchar(30), contacttitle varchar(30), address varchar(60), city varchar(15), region varchar(15), postalcode varchar(10), country varchar(15), phone varchar(24), fax varchar(24));' +
        'create table employees (employeeid int, lastname varchar(20), firstname varchar(10), title varchar(30), titleofcourtesy varchar(25), birthdate date, hiredate date, address varchar(60), city varchar(15), region varchar(15), postalcode varchar(10), country varchar(15), homephone varchar(24), extension varchar(4), photo bytea, notes text, reportto int, photopath varchar(255));' +
        'create table employee_territories (employeeid int, territoryid varchar(20));' +
        'create table orders_details (orderid int, productid int, unitprice money, quantity smallint, discount real);' +
        'create table orders (orderid int, customerid char(5), employeeid int, orderdate date, requireddate date, shippeddate date, shipvia int, freight money, shipname varchar(40), shipaddress varchar(60), shipcity varchar(15), shipregion varchar(15), shippostalcode varchar(10), shipcountry varchar(15));' +
        'create table products (productid int, productname varchar(40), supplierid int, categoryid int, quantityperunit varchar(20), unitprice money, unitsinstock smallint, unitsonorder smallint, reorderlevel smallint, discontinued bit);' +
        'create table regions (regionid int, regiondescription char(50));' +
        'create table shippers (shipperid int, companyname varchar(40), phone varchar(24));' +
        'create table suppliers (supplierid int, companyname varchar(40), contactname varchar(30), contacttitle varchar(30), address varchar(60), city varchar(15), region varchar(15), postalcode varchar(10), country varchar(15), phone varchar(24), fax varchar(24), homepage text);' +
        'create table territories (territoryid varchar(20), territorydescription char(50), regionid int);',
};

let dropTableQuery = {
    cmd:
        'drop table categories;' +
        'drop table customers;' +
        'drop table employees;' +
        'drop table employee_territories;' +
        'drop table orders_details;' +
        'drop table orders;' +
        'drop table products;' +
        'drop table regions;' +
        'drop table shippers;' +
        'drop table suppliers;' +
        'drop table territories;',
};

describe('Cypher DML Test', () => {
    beforeEach(connectDatabase);

    it('Execute MatchQuery', (done) => {
        request
            .post(`${cypherUrl}/`)
            .send(matchQuery)
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
                if (err) {
                    done(err);
                }
                console.log(res.body.rows[0])
                done();
            });
    });

    it('Execute PathQuery', (done) => {
        request
            .post(`${cypherUrl}/`)
            .send(pathQuery)
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
                if (err) {
                    done(err);
                }
                done();
            });
    });

    describe('Cypher Create Test', () => {
        afterEach('Check create data', executeMatchQuery);

        it('Execute Create', (done) => {
            request
                .post(`${cypherUrl}/`)
                .send(createQuery)
                .expect('Content-Type', /json/)
                .expect(200)
                .end((err, res) => {
                    if (err) {
                        done(err);
                    }
                    done();
                });
        });
    });

    describe('Cypher Create Test', () => {
        beforeEach('Check exist data', executeMatchQuery);

        it('Execute Delete', (done) => {
            request
                .post(`${cypherUrl}/`)
                .send(deleteQuery)
                .expect('Content-Type', /json/)
                .expect(200)
                .end((err, res) => {
                    if (err) {
                        done(err);
                    }
                    done();
                });
        });

        afterEach('Check delete data', executeMatchQuery);
    });

    describe('Cypher DDL Test', () => {
        it('Create Table', (done) => {
            request
                .post(`${cypherUrl}/`)
                .send(createTableQuery)
                .expect('Content-Type', /json/)
                .expect(200)
                .end((err, res) => {
                    if (err) {
                        done(err);
                    }
                    console.log(res.body);
                    done();
                });
        });

        it('Drop Table', (done) => {
            request
                .post(`${cypherUrl}/`)
                .send(dropTableQuery)
                .expect('Content-Type', /json/)
                .expect(200)
                .end((err, res) => {
                    if (err) {
                        done(err);
                    }
                    console.log(res.body);
                    done();
                });
        });
    });
});

function connectDatabase(done) {
    request
        .post(`${dbUrl}/connect`)
        .send(connectParam)
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
            if (err) throw err;
            assert(res.body, connectParam);
            return done();
        });
}

function executeMatchQuery(done) {
    request
        .post(`${cypherUrl}/`)
        .send(countQuery)
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
            if (err) {
                done(err);
            }
            done();
        });
}
