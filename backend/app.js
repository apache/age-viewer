/*
 * Copyright 2020 Bitnine Co., Ltd.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const express = require('express');
const cors = require('cors');
const session = require('express-session');
const uuid = require('node-uuid');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const { stream } = require('./src/config/winston');
const cypherRouter = require('./src/routes/cypherRouter');
const databaseRouter = require('./src/routes/databaseRouter');
const sessionRouter = require('./src/routes/sessionRouter');
const app = express();

app.use(cors())
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
app.post('/agensviewer', sessionRouter, function(req, res) {
    console.log(req.sessionID);
    res.redirect('/');
});
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