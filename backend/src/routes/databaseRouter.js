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
const express = require("express");
const DatabaseController = require('../controllers/databaseController')
const router = express.Router();
const databaseController = new DatabaseController();

const {wrap} = require('../common/Routes');
// Get connection status
router.get("/", wrap(databaseController.getStatus));
router.post("/connect", wrap(databaseController.connectDatabase));
router.get("/disconnect", wrap(databaseController.disconnectDatabase));
router.get("/meta", wrap(databaseController.getMetadata));
router.get("/metaChart", wrap(databaseController.getMetaChart));

module.exports = router;