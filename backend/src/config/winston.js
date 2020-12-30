const fs = require('fs');
const winston = require('winston');
const winstonDaily = require('winston-daily-rotate-file');

const logDir = __dirname + '/../logs';
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
