"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
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
var sessionService = require('../services/sessionService');
var winston = require('winston');
var DatabaseController = /*#__PURE__*/function () {
  function DatabaseController() {
    (0, _classCallCheck2["default"])(this, DatabaseController);
  }
  return (0, _createClass2["default"])(DatabaseController, [{
    key: "connectDatabase",
    value: function () {
      var _connectDatabase = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
        var databaseService, connectionInfo;
        return _regenerator["default"].wrap(function (_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              databaseService = sessionService.get(req.sessionID);
              if (databaseService.isConnected()) {
                _context.next = 1;
                break;
              }
              _context.next = 1;
              return databaseService.connectDatabase(req.body);
            case 1:
              connectionInfo = databaseService.getConnectionInfo();
              res.status(200).json(connectionInfo).end();
            case 2:
            case "end":
              return _context.stop();
          }
        }, _callee);
      }));
      function connectDatabase(_x, _x2, _x3) {
        return _connectDatabase.apply(this, arguments);
      }
      return connectDatabase;
    }()
  }, {
    key: "disconnectDatabase",
    value: function () {
      var _disconnectDatabase = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res, next) {
        var databaseService, isDisconnect;
        return _regenerator["default"].wrap(function (_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              databaseService = sessionService.get(req.sessionID);
              if (!databaseService.isConnected()) {
                _context2.next = 2;
                break;
              }
              _context2.next = 1;
              return databaseService.disconnectDatabase();
            case 1:
              isDisconnect = _context2.sent;
              if (isDisconnect) {
                res.status(200).json({
                  msg: 'Disconnect Successful'
                }).end();
              } else {
                res.status(500).json({
                  msg: 'Already Disconnected'
                }).end();
              }
              _context2.next = 3;
              break;
            case 2:
              throw new Error('Not connected');
            case 3:
            case "end":
              return _context2.stop();
          }
        }, _callee2);
      }));
      function disconnectDatabase(_x4, _x5, _x6) {
        return _disconnectDatabase.apply(this, arguments);
      }
      return disconnectDatabase;
    }()
  }, {
    key: "getStatus",
    value: function () {
      var _getStatus = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res, next) {
        var databaseService;
        return _regenerator["default"].wrap(function (_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              databaseService = sessionService.get(req.sessionID);
              if (!databaseService.isConnected()) {
                _context3.next = 2;
                break;
              }
              _context3.next = 1;
              return databaseService.getConnectionStatus();
            case 1:
              res.status(200).json(databaseService.getConnectionInfo()).end();
              _context3.next = 3;
              break;
            case 2:
              throw new Error('Not connected');
            case 3:
            case "end":
              return _context3.stop();
          }
        }, _callee3);
      }));
      function getStatus(_x7, _x8, _x9) {
        return _getStatus.apply(this, arguments);
      }
      return getStatus;
    }()
  }, {
    key: "getMetadata",
    value: function () {
      var _getMetadata = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res, next) {
        var databaseService, metadata;
        return _regenerator["default"].wrap(function (_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              databaseService = sessionService.get(req.sessionID);
              if (!databaseService.isConnected()) {
                _context4.next = 2;
                break;
              }
              _context4.next = 1;
              return databaseService.getMetaData(req.body);
            case 1:
              metadata = _context4.sent;
              res.status(200).json(metadata).end();
              _context4.next = 3;
              break;
            case 2:
              throw new Error('Not connected');
            case 3:
            case "end":
              return _context4.stop();
          }
        }, _callee4);
      }));
      function getMetadata(_x0, _x1, _x10) {
        return _getMetadata.apply(this, arguments);
      }
      return getMetadata;
    }()
    /*
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
            throw new Error('Not connected');
        }
    }*/
  }]);
}();
module.exports = DatabaseController;
//# sourceMappingURL=databaseController.js.map