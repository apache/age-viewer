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
const sessionService = require('../services/sessionService');
const winston = require('winston');
const logger = winston.createLogger();

class DatabseController {

    async connectDatabase(req, res, next) {
        let databaseService = sessionService.get(req.sessionID);
        if (databaseService.isConnected()) {
            res.status(200).json(databaseService.getConnectionInfo()).end();
        } else {
            try {
                await databaseService.connectDatabase(req.body);
                res.status(200).json(databaseService.getConnectionInfo()).end();
            } catch (err) {
                let error = new Error(err.message);
                error.status = 500;
                next(error);
            }
        }
    }

    async disconnectDatabase(req, res, next) {
        let databaseService = sessionService.get(req.sessionID);
        if (databaseService.isConnected()) {
            let isDisconnect = await databaseService.disconnectDatabase();

            if (isDisconnect) {
                res.status(200).json({ msg: 'Disconnect Successful' }).end();
            } else {
                res.status(500).json({ msg: 'Already Disconnected' }).end();
            }
        } else {
            let error = new Error('Not connected');
            error.status = 500;
            next(error);
        }
    }

    async getStatus(req, res, next) {
        let databaseService = sessionService.get(req.sessionID);
        if (databaseService.isConnected()) {
            try {
                await databaseService.getConnectionStatus();
                res.status(200).json(databaseService.getConnectionInfo()).end();
            } catch (err) {
                let error = new Error(err.message);
                error.status = 500;
                next(error);
            }
        } else {
            let error = new Error('Not connected');
            error.status = 500;
            next(error);
        }
    }

    async getMetadata(req, res, next) {
        let databaseService = sessionService.get(req.sessionID);
        if (databaseService.isConnected()) {
            let metadata = null;
            try {
                metadata = await databaseService.getMetaData();
                res.status(200).json(metadata).end();
            } catch (error) {
                res.status(500).json(metadata).end();
            }
        } else {
            let error = new Error('Not connected');
            error.status = 500;
            next(error);
        }
    }

    async getMetaChart(req, res, next) {
        let databaseService = sessionService.get(req.sessionID);
        if (databaseService.isConnected()) {
            let metadata = [];
            try {
                let graphLabels = await databaseService.getGraphLabels();
                for (let labels of graphLabels) {
                    let countResults = await databaseService.getGraphLabelCount(labels.la_name, labels.la_kind)
                    for (let idx in countResults) {
                        if (idx > 0) {
                            labels.la_name = labels.la_name + "-" + idx
                            labels.la_oid = labels.la_oid + (idx * 0.1)
                        }
                        metadata.push(Object.assign({}, labels, countResults[idx]))
                    }
                }
                res.status(200).json(metadata).end();
            } catch (error) {
                res.status(500).json(metadata).end();
            }
        } else {
            let error = new Error('Not connected');
            error.status = 500;
            next(error);
        }
    }
}
module.exports = DatabseController;
