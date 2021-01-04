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
class DatabseController {

    async connectDatabase(req, res, next) {
        let connectorService = sessionService.get(req.sessionID);
        if (connectorService.isConnected()) {
            res.status(200).json(connectorService.getConnectionInfo()).end();
        } else {
            try {
                await connectorService.connectDatabase(req.body);
                res.status(200).json(connectorService.getConnectionInfo()).end();
            } catch (err) {
                let error = new Error(err.message);
                error.status = 500;
                next(error);
            }
        }
    }

    async disconnectDatabase(req, res, next) {
        let connectorService = sessionService.get(req.sessionID);
        if (connectorService.isConnected()) {
            let isDisconnect = await connectorService.disconnectDatabase();

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
        let connectorService = sessionService.get(req.sessionID);
        if (connectorService.isConnected()) {
            try {
                await connectorService.getConnectionStatus();
                res.status(200).json(connectorService.getConnectionInfo()).end();
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
        let connectorService = sessionService.get(req.sessionID);
        if (connectorService.isConnected()) {
            let metadata = null;
            try {
                metadata = await connectorService.getMetaData();
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
