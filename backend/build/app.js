"use strict";

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
var express = require('express');
var cors = require('cors');
var session = require('express-session');
var uuid = require('uuid');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var _require = require('./config/winston'),
  stream = _require.stream;
var cypherRouter = require('./routes/cypherRouter');
var databaseRouter = require('./routes/databaseRouter');
var sessionRouter = require('./routes/sessionRouter');
var miscellaneousRouter = require('./routes/miscellaneous');
var app = express();
app.use(cors({
  origin: true,
  credentials: true
}));
app.use(express["static"](path.join(__dirname, '../../frontend/build')));
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '../../frontend/build', 'index.html'));
});
app.use(session({
  secret: 'apache-age-viewer',
  secure: true,
  resave: false,
  saveUninitialized: true,
  proxy: true,
  genid: function genid(req) {
    return uuid.v4();
  }
}));
app.use(logger('common', {
  stream: stream
}));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use('/api/v1/*', sessionRouter);
app.use('/api/v1/miscellaneous', miscellaneousRouter);
app.use('/api/v1/cypher', cypherRouter);
app.use('/api/v1/db', databaseRouter);

// Error Handler
app.use(function (err, req, res, next) {
  // TODO: logger
  console.error(err);
  res.status(err.status || 500).json({
    severity: err.severity || '',
    message: err.message || '',
    code: err.code || ''
  });
});
process.on('uncaughtException', function (exception) {
  console.log(exception);
});
module.exports = app;
//# sourceMappingURL=app.js.map