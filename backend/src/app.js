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
const express = require('express');
const cors = require('cors');
const session = require('express-session');
const uuid = require('uuid');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const {stream} = require('./config/winston');
const cypherRouter = require('./routes/cypherRouter');
const databaseRouter = require('./routes/databaseRouter');
const sessionRouter = require('./routes/sessionRouter');
const miscellaneousRouter = require('./routes/miscellaneous');
const app = express();

app.use(cors({
    origin: true,
    credentials: true
}))
app.use(express.static(path.join(__dirname, '../../frontend/build')));
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '../../frontend/build', 'index.html'));
});

app.use(
    session({
        secret: 'apache-age-viewer',
        secure: true,
        resave: false,
        saveUninitialized: true,
        proxy: true,
        genid: (req) => {
            return uuid.v4();
        },
    })
);
app.use(logger('common', {stream}));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

app.use('/api/v1/*', sessionRouter);
app.use('/api/v1/miscellaneous', miscellaneousRouter);
app.use('/api/v1/cypher', cypherRouter);
app.use('/api/v1/db', databaseRouter);

// Error Handler
app.use(function (err, req, res, next) {
    // TODO: logger
    console.error(err);
    res.status(err.status || 500).json(
        {
            severity: err.severity || '',
            message: err.message || '',
            code: err.code || ''
        }
    );
});

process.on('uncaughtException', function (exception) {
    console.log(exception);
});

module.exports = app;
