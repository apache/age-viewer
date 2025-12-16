"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
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
var SessionService = /*#__PURE__*/function () {
  function SessionService() {
    (0, _classCallCheck2["default"])(this, SessionService);
    this._sessionMap = new Map();
  }
  return (0, _createClass2["default"])(SessionService, [{
    key: "put",
    value: function put(key, value) {
      this._sessionMap.set(key, value);
    }
  }, {
    key: "get",
    value: function get(key) {
      if (!this._sessionMap.get(key)) {
        return null;
      }
      return this._sessionMap.get(key);
    }
  }]);
}();
var sessionService = new SessionService();
module.exports = sessionService;
//# sourceMappingURL=sessionService.js.map