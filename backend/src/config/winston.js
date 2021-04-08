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
const fs = require('fs');
const winston = require('winston');
const winstonDaily = require('winston-daily-rotate-file');

const logDir = process.env.LOG_DIR || 'logs';
const { combine, timestamp, printf } = winston.format;

const logFormat = printf((info) => {
    return `${info.timestamp} ${info.level}: ${info.message}`;
});

if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
}

const infoTransport = new winstonDaily({
    level: 'info',
    datePattern: 'YYYY-MM-DD',
    dirname: logDir,
    filename: 'info.%DATE%.log',
    maxFiles: 15,
    zippedArchive: true,
});

const errorTransport = new winstonDaily({
    level: 'error',
    datePattern: 'YYYY-MM-DD',
    dirname: logDir + '/error',
    filename: 'error.%DATE%.log',
    maxFiles: 15,
    zippedArchive: true,
});

const logger = winston.createLogger({
    format: combine(
        timestamp({
            format: 'YYYY-MM-DD HH:mm:ss',
        }),
        logFormat
    ),
    transports: [infoTransport, errorTransport],
});

const stream = {
    write: (message) => {
        logger.info(message);
    },
};

if (process.env.NODE_ENV !== 'production') {
    logger.add(
        new winston.transports.Console({
            format: winston.format.combine(winston.format.colorize(), winston.format.simple()),
        })
    );
}

module.exports = { logger, stream };
