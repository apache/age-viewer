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
var fs = require('fs');
var winston = require('winston');
var winstonDaily = require('winston-daily-rotate-file');
var logDir = process.env.LOG_DIR || 'logs';
var _winston$format = winston.format,
  combine = _winston$format.combine,
  timestamp = _winston$format.timestamp,
  printf = _winston$format.printf;
var logFormat = printf(function (info) {
  return "".concat(info.timestamp, " ").concat(info.level, ": ").concat(info.message);
});
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}
var infoTransport = new winstonDaily({
  level: 'info',
  datePattern: 'YYYY-MM-DD',
  dirname: logDir,
  filename: 'info.%DATE%.log',
  maxFiles: 15,
  zippedArchive: true
});
var errorTransport = new winstonDaily({
  level: 'error',
  datePattern: 'YYYY-MM-DD',
  dirname: logDir + '/error',
  filename: 'error.%DATE%.log',
  maxFiles: 15,
  zippedArchive: true
});
var logger = winston.createLogger({
  format: combine(timestamp({
    format: 'YYYY-MM-DD HH:mm:ss'
  }), logFormat),
  transports: [infoTransport, errorTransport]
});
var stream = {
  write: function write(message) {
    logger.info(message);
  }
};
if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.combine(winston.format.colorize(), winston.format.simple())
  }));
}
module.exports = {
  logger: logger,
  stream: stream
};
//# sourceMappingURL=winston.js.map