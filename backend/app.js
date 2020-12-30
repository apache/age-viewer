const express = require('express');
const session = require('express-session');
const uuid = require('node-uuid');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const { stream } = require('./src/config/winston');
const cypherRouter = require('./src/controllers/cypherController');
const databaseRouter = require('./src/controllers/databaseController');
const sessionRouter = require('./src/routes/sessionRouter');

let app = express();

app.use(express.static(path.join(__dirname, '../../frontend/build')));
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '../../frontend/build', 'index.html'));
});

app.use(
    session({
        secret: 'bitnine123!',
        secure: true,
        resave: true,
        saveUninitialized: true,
        proxy: true,
        genid: (req) => {
            return uuid.v1();
        },
    })
);
app.use(logger('common', { stream }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api/v1/*', sessionRouter);
app.use('/api/v1/cypher', cypherRouter);
app.use('/api/v1/db', databaseRouter);
app.use(errorHandler);

process.on('uncaughtException', function (exception) {
    console.log(exception);
});

function errorHandler(err, req, res, next) {
    res.status(err.status).json({ message: err.message }).end();
}

module.exports = app;
