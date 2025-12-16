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
var express = require("express");
var DatabaseController = require('../controllers/databaseController');
var router = express.Router();
var databaseController = new DatabaseController();
var _require = require('../common/Routes'),
  wrap = _require.wrap;
// Get connection status
router.get("/", wrap(databaseController.getStatus));
router.post("/connect", wrap(databaseController.connectDatabase));
router.get("/disconnect", wrap(databaseController.disconnectDatabase));
router.post("/meta", wrap(databaseController.getMetadata));
router.get("/metaChart", wrap(databaseController.getMetaChart));
module.exports = router;
//# sourceMappingURL=databaseRouter.js.map