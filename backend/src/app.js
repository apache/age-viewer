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

import FeatureRouter from "./routes/FeatureRouter";

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
const agcloudRouter = require('./routes/agcloudRouter');
const sessionRouter = require('./routes/sessionRouter');
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
        secret: 'bitnine123!',
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

app.use('/agensviewer', sessionRouter, agcloudRouter);
app.use('/api/v1/*', sessionRouter);
app.use('/api/v1/cypher', cypherRouter);
app.use('/api/v1/db', databaseRouter);
app.use('/api/v1/feature', FeatureRouter);

// Error Handler
app.use(function (err, req, res, next) {
    // TODO: logger
    console.error(err);
    res.status(err.status || 500).json({message: err.message});
});

process.on('uncaughtException', function (exception) {
    console.log(exception);
});

module.exports = app;
