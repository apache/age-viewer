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

class AgcloudController {
    async connectDatabase(req, res, next) {
        let databaseService = sessionService.get(req.sessionID);
        if (databaseService.isConnected() || !req.body) {
            res.redirect('/');
        } else {
            await databaseService.connectDatabase(req.body);
            res.redirect('/');
        }
    }
}

module.exports = AgcloudController;