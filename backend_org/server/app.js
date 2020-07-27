let express = require('express');
let session = require('express-session')
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');

let cypherRouter = require('./api/cypher/cypherController');
let databaseRouter = require('./api/database/databaseController');

let app = express();

app.use(session({
    secret: 'bitnine123!',
    resave: true,
    saveUninitialized: true,
    proxy: true
}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api/v1/cypher', cypherRouter);
app.use('/api/v1/db', databaseRouter);

module.exports = app;
