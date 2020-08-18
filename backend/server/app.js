const express = require('express');
const session = require('express-session');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const supertest = require('supertest');
const cypherRouter = require('./application/cypher/cypherController');
const databaseRouter = require('./application/connector/connectorController');

let app = express();

app.use(express.static(path.join(__dirname, '../../frontend/build')));
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '../../frontend/build', 'index.html'));
});

app.use(
    session({
        secret: 'bitnine123!',
        resave: true,
        saveUninitialized: true,
        proxy: true,
    })
);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api/v1/cypher', cypherRouter);
app.use('/api/v1/db', databaseRouter);

process.on('uncaughtException', function (exception) {
    console.log(exception);
});

module.exports = app;
