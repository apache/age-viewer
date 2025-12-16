"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _Pg = _interopRequireDefault(require("../config/Pg"));
var _pg = _interopRequireDefault(require("pg"));
var _pgTypes = _interopRequireDefault(require("pg-types"));
var _AGEParser = require("../tools/AGEParser");
var _SQLFlavorManager = require("../tools/SQLFlavorManager");
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
var GraphRepository = /*#__PURE__*/function () {
  function GraphRepository() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      host = _ref.host,
      port = _ref.port,
      database = _ref.database,
      graph = _ref.graph,
      user = _ref.user,
      password = _ref.password,
      _ref$graphs = _ref.graphs,
      graphs = _ref$graphs === void 0 ? [] : _ref$graphs,
      server = _ref.server;
    (0, _classCallCheck2["default"])(this, GraphRepository);
    this._host = host;
    this._port = port;
    this._database = database;
    this._server_version = server;
    this._graphs = graphs;
    this._graph = graph;
    this._user = user;
    this._password = password;
  }
  /*
  static async getConnection({
                                 host,
                                 port,
                                 database,
                                 user,
                                 password,
                             } = {},
                             closeConnection = true) {
      const client = new pg.Client({
              user,
              password,
              host,
              database,
              port,
          }
      )
       client.connect();
      
      await setAGETypes(client, types);
      if (closeConnection === true) {
          await client.end();
      }
      return client;
  }
  */
  return (0, _createClass2["default"])(GraphRepository, [{
    key: "connect",
    value: (function () {
      var _connect = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee() {
        var client, _yield$onConnectQueri, v;
        return _regenerator["default"].wrap(function (_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              if (!this._pool) {
                this._pool = GraphRepository.newConnectionPool(this.getPoolConnectionInfo());
              }
              _context.next = 1;
              return this._pool.connect();
            case 1:
              client = _context.sent;
              if (this._server_version) {
                _context.next = 3;
                break;
              }
              _context.next = 2;
              return (0, _AGEParser.onConnectQueries)(client);
            case 2:
              _yield$onConnectQueri = _context.sent;
              v = _yield$onConnectQueri.server_version;
              this._server_version = v;
            case 3:
              return _context.abrupt("return", client);
            case 4:
            case "end":
              return _context.stop();
          }
        }, _callee, this);
      }));
      function connect() {
        return _connect.apply(this, arguments);
      }
      return connect;
    }())
  }, {
    key: "execute",
    value: // Execute cypher query with params
    function () {
      var _execute = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee2(query) {
        var params,
          client,
          result,
          _args2 = arguments,
          _t;
        return _regenerator["default"].wrap(function (_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              params = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : [];
              _context2.next = 1;
              return this.getConnection();
            case 1:
              client = _context2.sent;
              result = null;
              _context2.prev = 2;
              _context2.next = 3;
              return client.query(query, params);
            case 3:
              result = _context2.sent;
              _context2.next = 5;
              break;
            case 4:
              _context2.prev = 4;
              _t = _context2["catch"](2);
              throw _t;
            case 5:
              _context2.prev = 5;
              client.release();
              return _context2.finish(5);
            case 6:
              return _context2.abrupt("return", result);
            case 7:
            case "end":
              return _context2.stop();
          }
        }, _callee2, this, [[2, 4, 5, 6]]);
      }));
      function execute(_x) {
        return _execute.apply(this, arguments);
      }
      return execute;
    }()
  }, {
    key: "createTransaction",
    value: function () {
      var _createTransaction = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee4() {
        var client;
        return _regenerator["default"].wrap(function (_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 1;
              return this.getConnection();
            case 1:
              client = _context4.sent;
              return _context4.abrupt("return", [client, (/*#__PURE__*/function () {
                var _ref2 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee3(query) {
                  var params,
                    _args3 = arguments,
                    _t2,
                    _t3;
                  return _regenerator["default"].wrap(function (_context3) {
                    while (1) switch (_context3.prev = _context3.next) {
                      case 0:
                        params = _args3.length > 1 && _args3[1] !== undefined ? _args3[1] : [];
                        _context3.next = 1;
                        return client.query(query, params);
                      case 1:
                        _t2 = _context3.sent;
                        _t3 = client;
                        return _context3.abrupt("return", [_t2, _t3]);
                      case 2:
                      case "end":
                        return _context3.stop();
                    }
                  }, _callee3);
                }));
                return function (_x2) {
                  return _ref2.apply(this, arguments);
                };
              }())]);
            case 2:
            case "end":
              return _context4.stop();
          }
        }, _callee4, this);
      }));
      function createTransaction() {
        return _createTransaction.apply(this, arguments);
      }
      return createTransaction;
    }()
  }, {
    key: "initGraphNames",
    value: function () {
      var _initGraphNames = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee5() {
        var _yield$this$execute, rows;
        return _regenerator["default"].wrap(function (_context5) {
          while (1) switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 1;
              return this.execute((0, _SQLFlavorManager.getQuery)('get_graph_names'));
            case 1:
              _yield$this$execute = _context5.sent;
              rows = _yield$this$execute.rows;
              this._graphs = rows.map(function (item) {
                return item.name;
              });
              // set current graph to first name
              this.setCurrentGraph(this._graphs[0]);
            case 2:
            case "end":
              return _context5.stop();
          }
        }, _callee5, this);
      }));
      function initGraphNames() {
        return _initGraphNames.apply(this, arguments);
      }
      return initGraphNames;
    }()
    /**
     * Get connectionInfo
     */
  }, {
    key: "getConnection",
    value: (function () {
      var _getConnection = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee6() {
        var client;
        return _regenerator["default"].wrap(function (_context6) {
          while (1) switch (_context6.prev = _context6.next) {
            case 0:
              _context6.next = 1;
              return this._pool.connect();
            case 1:
              client = _context6.sent;
              _context6.next = 2;
              return (0, _AGEParser.setAGETypes)(client, _pgTypes["default"]);
            case 2:
              return _context6.abrupt("return", client);
            case 3:
            case "end":
              return _context6.stop();
          }
        }, _callee6, this);
      }));
      function getConnection() {
        return _getConnection.apply(this, arguments);
      }
      return getConnection;
    }()
    /**
     * Release connection
     */
    )
  }, {
    key: "releaseConnection",
    value: (function () {
      var _releaseConnection = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee7() {
        var _t4;
        return _regenerator["default"].wrap(function (_context7) {
          while (1) switch (_context7.prev = _context7.next) {
            case 0:
              _context7.prev = 0;
              _context7.next = 1;
              return this._pool.end();
            case 1:
              return _context7.abrupt("return", true);
            case 2:
              _context7.prev = 2;
              _t4 = _context7["catch"](0);
              throw _t4;
            case 3:
            case "end":
              return _context7.stop();
          }
        }, _callee7, this, [[0, 2]]);
      }));
      function releaseConnection() {
        return _releaseConnection.apply(this, arguments);
      }
      return releaseConnection;
    }()
    /**
     * Get connection pool information
     */
    )
  }, {
    key: "getPoolConnectionInfo",
    value: function getPoolConnectionInfo() {
      if (!this._host || !this._port || !this._database) {
        return null;
      }
      return {
        host: this._host,
        port: this._port,
        database: this._database,
        version: this._server_version,
        user: this._user,
        password: this._password,
        max: _Pg["default"].max,
        idleTimeoutMillis: _Pg["default"].idleTimeoutMillis,
        connectionTimeoutMillis: _Pg["default"].connectionTimeoutMillis
      };
    }

    /**
     * Get connection info
     */
  }, {
    key: "getConnectionInfo",
    value: function getConnectionInfo() {
      if (!this._host || !this._port || !this._database) {
        throw new Error("Not connected");
      }
      return {
        host: this._host,
        version: this._server_version,
        port: this._port,
        database: this._database,
        user: this._user,
        password: this._password,
        graphs: this._graphs,
        graph: this._graph
      };
    }
  }, {
    key: "setCurrentGraph",
    value: function setCurrentGraph(name) {
      this._graph = name;
    }
  }], [{
    key: "newConnectionPool",
    value: function newConnectionPool(poolConnectionConfig) {
      return new _pg["default"].Pool(poolConnectionConfig);
    }
  }]);
}();
module.exports = GraphRepository;
//# sourceMappingURL=GraphRepository.js.map