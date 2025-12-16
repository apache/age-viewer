"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
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

var CypherService = require("../services/cypherService");
var sessionService = require("../services/sessionService");
var GraphCreator = require("../models/GraphCreator");
var CypherController = /*#__PURE__*/function () {
  function CypherController() {
    (0, _classCallCheck2["default"])(this, CypherController);
  }
  return (0, _createClass2["default"])(CypherController, [{
    key: "executeCypher",
    value: function () {
      var _executeCypher = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
        var connectorService, cypherService, data;
        return _regenerator["default"].wrap(function (_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              connectorService = sessionService.get(req.sessionID);
              if (!connectorService.isConnected()) {
                _context.next = 2;
                break;
              }
              cypherService = new CypherService(connectorService.graphRepository);
              _context.next = 1;
              return cypherService.executeCypher(req.body.cmd);
            case 1:
              data = _context.sent;
              res.status(200).json(data).end();
              _context.next = 3;
              break;
            case 2:
              throw new Error("Not connected");
            case 3:
            case "end":
              return _context.stop();
          }
        }, _callee);
      }));
      function executeCypher(_x, _x2) {
        return _executeCypher.apply(this, arguments);
      }
      return executeCypher;
    }()
  }, {
    key: "createGraph",
    value: function () {
      var _createGraph = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res, next) {
        var db, _yield$db$graphReposi, _yield$db$graphReposi2, client, transaction, graph, DROP, CREATE, details, err, _t, _t2;
        return _regenerator["default"].wrap(function (_context5) {
          while (1) switch (_context5.prev = _context5.next) {
            case 0:
              db = sessionService.get(req.sessionID);
              if (!db.isConnected()) {
                _context5.next = 17;
                break;
              }
              _context5.next = 1;
              return db.graphRepository.createTransaction();
            case 1:
              _yield$db$graphReposi = _context5.sent;
              _yield$db$graphReposi2 = (0, _slicedToArray2["default"])(_yield$db$graphReposi, 2);
              client = _yield$db$graphReposi2[0];
              transaction = _yield$db$graphReposi2[1];
              _context5.prev = 2;
              graph = new GraphCreator({
                nodes: req.files.nodes,
                edges: req.files.edges,
                graphName: req.body.graphName,
                dropGraph: req.body.dropGraph === 'true'
              });
              _context5.next = 3;
              return graph.parseData();
            case 3:
              DROP = graph.query.graph.drop;
              CREATE = graph.query.graph.create;
              if (!DROP) {
                _context5.next = 7;
                break;
              }
              _context5.prev = 4;
              _context5.next = 5;
              return client.query(DROP);
            case 5:
              _context5.next = 7;
              break;
            case 6:
              _context5.prev = 6;
              _t = _context5["catch"](4);
              if (!(_t.code !== '3F000')) {
                _context5.next = 7;
                break;
              }
              throw _t;
            case 7:
              _context5.next = 8;
              return client.query(CREATE);
            case 8:
              _context5.next = 9;
              return transaction('BEGIN');
            case 9:
              _context5.next = 10;
              return Promise.all(graph.query.labels.map(/*#__PURE__*/function () {
                var _ref = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee2(q) {
                  return _regenerator["default"].wrap(function (_context2) {
                    while (1) switch (_context2.prev = _context2.next) {
                      case 0:
                        _context2.next = 1;
                        return transaction(q);
                      case 1:
                        return _context2.abrupt("return", _context2.sent);
                      case 2:
                      case "end":
                        return _context2.stop();
                    }
                  }, _callee2);
                }));
                return function (_x6) {
                  return _ref.apply(this, arguments);
                };
              }()));
            case 10:
              _context5.next = 11;
              return Promise.all(graph.query.nodes.map(/*#__PURE__*/function () {
                var _ref2 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee3(q) {
                  return _regenerator["default"].wrap(function (_context3) {
                    while (1) switch (_context3.prev = _context3.next) {
                      case 0:
                        _context3.next = 1;
                        return transaction(q);
                      case 1:
                        return _context3.abrupt("return", _context3.sent);
                      case 2:
                      case "end":
                        return _context3.stop();
                    }
                  }, _callee3);
                }));
                return function (_x7) {
                  return _ref2.apply(this, arguments);
                };
              }()));
            case 11:
              _context5.next = 12;
              return Promise.all(graph.query.edges.map(/*#__PURE__*/function () {
                var _ref3 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee4(q) {
                  return _regenerator["default"].wrap(function (_context4) {
                    while (1) switch (_context4.prev = _context4.next) {
                      case 0:
                        _context4.next = 1;
                        return transaction(q);
                      case 1:
                        return _context4.abrupt("return", _context4.sent);
                      case 2:
                      case "end":
                        return _context4.stop();
                    }
                  }, _callee4);
                }));
                return function (_x8) {
                  return _ref3.apply(this, arguments);
                };
              }()));
            case 12:
              _context5.next = 13;
              return transaction('COMMIT');
            case 13:
              res.status(204).end();
              _context5.next = 16;
              break;
            case 14:
              _context5.prev = 14;
              _t2 = _context5["catch"](2);
              _context5.next = 15;
              return transaction('ROLLBACK');
            case 15:
              details = _t2.toString();
              err = _objectSpread(_objectSpread({}, _t2), {}, {
                details: details
              });
              res.status(500).json(err).end();
            case 16:
              _context5.prev = 16;
              client.release();
              return _context5.finish(16);
            case 17:
            case "end":
              return _context5.stop();
          }
        }, _callee5, null, [[2, 14, 16, 17], [4, 6]]);
      }));
      function createGraph(_x3, _x4, _x5) {
        return _createGraph.apply(this, arguments);
      }
      return createGraph;
    }()
  }]);
}();
module.exports = CypherController;
//# sourceMappingURL=cypherController.js.map