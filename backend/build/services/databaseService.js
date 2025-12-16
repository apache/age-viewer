"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _SQLFlavorManager = require("../tools/SQLFlavorManager");
var util = _interopRequireWildcard(require("util"));
var _GraphRepository = _interopRequireDefault(require("../models/GraphRepository"));
var _repl = require("repl");
var _http = require("http");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t5 in e) "default" !== _t5 && {}.hasOwnProperty.call(e, _t5) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t5)) && (i.get || i.set) ? o(f, _t5, i) : f[_t5] = e[_t5]); return f; })(e, t); }
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
var DatabaseService = /*#__PURE__*/function () {
  function DatabaseService() {
    (0, _classCallCheck2["default"])(this, DatabaseService);
    this._graphRepository = null;
  }
  return (0, _createClass2["default"])(DatabaseService, [{
    key: "getMetaData",
    value: function () {
      var _getMetaData = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee(graphName) {
        var gr, _gr$getConnectionInfo, graphs;
        return _regenerator["default"].wrap(function (_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              gr = this._graphRepository;
              _context.next = 1;
              return gr.initGraphNames();
            case 1:
              _gr$getConnectionInfo = gr.getConnectionInfo(), graphs = _gr$getConnectionInfo.graphs;
              _context.next = 2;
              return DatabaseService.analyzeGraph(gr);
            case 2:
              if (!graphName) {
                _context.next = 7;
                break;
              }
              if (!graphs.includes(graphName.currentGraph)) {
                _context.next = 4;
                break;
              }
              _context.next = 3;
              return this.getMetaDataSingle(graphName.currentGraph, graphs);
            case 3:
              return _context.abrupt("return", _context.sent);
            case 4:
              _context.next = 5;
              return this.getMetaDataSingle(gr._graph, graphs);
            case 5:
              return _context.abrupt("return", _context.sent);
            case 6:
              _context.next = 10;
              break;
            case 7:
              if (!(graphs.length > 0)) {
                _context.next = 9;
                break;
              }
              _context.next = 8;
              return this.graphNameInitialize(graphs);
            case 8:
              return _context.abrupt("return", _context.sent);
            case 9:
              throw new Error('graph does not exist');
            case 10:
            case "end":
              return _context.stop();
          }
        }, _callee, this);
      }));
      function getMetaData(_x) {
        return _getMetaData.apply(this, arguments);
      }
      return getMetaData;
    }() // async getMetaDataMultiple(graphs){
    //     const metadata = {};
    //     await Promise.all(graphs.map(async(gname)=>{
    //         metadata[gname] = await this.getMetaDataSingle(gname);
    //     }))
    //     return metadata;
    // }
  }, {
    key: "getMetaDataSingle",
    value: function () {
      var _getMetaDataSingle = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee2(curGraph, graphs) {
        var metadata, data, _this$getConnectionIn, database, _yield$this$readMetaD, nodes, edges, _t;
        return _regenerator["default"].wrap(function (_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              metadata = {};
              data = {};
              _this$getConnectionIn = this.getConnectionInfo(), database = _this$getConnectionIn.database;
              _context2.prev = 1;
              _context2.next = 2;
              return this.readMetaData(curGraph);
            case 2:
              _yield$this$readMetaD = _context2.sent;
              nodes = _yield$this$readMetaD.nodes;
              edges = _yield$this$readMetaD.edges;
              data.nodes = nodes;
              data.edges = edges;
              _context2.next = 3;
              return this.getPropertyKeys();
            case 3:
              data.propertyKeys = _context2.sent;
              data.graph = curGraph;
              data.database = database;
              _context2.next = 4;
              return this.getRole();
            case 4:
              data.role = _context2.sent;
              graphs.forEach(function (gname) {
                if (gname !== curGraph) metadata[gname] = {};else metadata[gname] = data;
              });
              _context2.next = 6;
              break;
            case 5:
              _context2.prev = 5;
              _t = _context2["catch"](1);
              throw _t;
            case 6:
              return _context2.abrupt("return", metadata);
            case 7:
            case "end":
              return _context2.stop();
          }
        }, _callee2, this, [[1, 5]]);
      }));
      function getMetaDataSingle(_x2, _x3) {
        return _getMetaDataSingle.apply(this, arguments);
      }
      return getMetaDataSingle;
    }()
  }, {
    key: "graphNameInitialize",
    value: function () {
      var _graphNameInitialize = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee3(graphs) {
        var metadata;
        return _regenerator["default"].wrap(function (_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              metadata = {};
              graphs.forEach(function (gname) {
                metadata[gname] = {};
              });
              return _context3.abrupt("return", metadata);
            case 1:
            case "end":
              return _context3.stop();
          }
        }, _callee3);
      }));
      function graphNameInitialize(_x4) {
        return _graphNameInitialize.apply(this, arguments);
      }
      return graphNameInitialize;
    }()
  }, {
    key: "getGraphLabels",
    value: function () {
      var _getGraphLabels = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee4() {
        var graphRepository, queryResult, _t2;
        return _regenerator["default"].wrap(function (_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              graphRepository = this._graphRepository;
              queryResult = {};
              _context4.prev = 1;
              _context4.next = 2;
              return graphRepository.execute((0, _SQLFlavorManager.getQuery)('graph_labels'), [this.getConnectionInfo().graph]);
            case 2:
              queryResult = _context4.sent;
              _context4.next = 4;
              break;
            case 3:
              _context4.prev = 3;
              _t2 = _context4["catch"](1);
              throw _t2;
            case 4:
              return _context4.abrupt("return", queryResult.rows);
            case 5:
            case "end":
              return _context4.stop();
          }
        }, _callee4, this, [[1, 3]]);
      }));
      function getGraphLabels() {
        return _getGraphLabels.apply(this, arguments);
      }
      return getGraphLabels;
    }()
  }, {
    key: "getGraphLabelCount",
    value: function () {
      var _getGraphLabelCount = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee5(labelName, labelKind) {
        var graphRepository, query, queryResult;
        return _regenerator["default"].wrap(function (_context5) {
          while (1) switch (_context5.prev = _context5.next) {
            case 0:
              graphRepository = this._graphRepository;
              query = null;
              if (labelKind === 'v') {
                query = util.format((0, _SQLFlavorManager.getQuery)('label_count_vertex'), "".concat(this.getConnectionInfo().graph, ".").concat(labelName));
              } else if (labelKind === 'e') {
                query = util.format((0, _SQLFlavorManager.getQuery)('label_count_edge'), "".concat(this.getConnectionInfo().graph, ".").concat(labelName));
              }
              _context5.next = 1;
              return graphRepository.execute(query);
            case 1:
              queryResult = _context5.sent;
              return _context5.abrupt("return", queryResult.rows);
            case 2:
            case "end":
              return _context5.stop();
          }
        }, _callee5, this);
      }));
      function getGraphLabelCount(_x5, _x6) {
        return _getGraphLabelCount.apply(this, arguments);
      }
      return getGraphLabelCount;
    }()
  }, {
    key: "readMetaData",
    value: function () {
      var _readMetaData = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee6(graphName) {
        var gr, _gr$getConnectionInfo2, version, queryResult;
        return _regenerator["default"].wrap(function (_context6) {
          while (1) switch (_context6.prev = _context6.next) {
            case 0:
              gr = this._graphRepository;
              _gr$getConnectionInfo2 = gr.getConnectionInfo(), version = _gr$getConnectionInfo2.version;
              _context6.next = 1;
              return gr.execute(util.format((0, _SQLFlavorManager.getQuery)('meta_data', version.split('.')[0]), graphName));
            case 1:
              queryResult = _context6.sent;
              return _context6.abrupt("return", this.parseMeta(queryResult.rows));
            case 2:
            case "end":
              return _context6.stop();
          }
        }, _callee6, this);
      }));
      function readMetaData(_x7) {
        return _readMetaData.apply(this, arguments);
      }
      return readMetaData;
    }()
  }, {
    key: "getPropertyKeys",
    value: function () {
      var _getPropertyKeys = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee7() {
        var graphRepository, queryResult;
        return _regenerator["default"].wrap(function (_context7) {
          while (1) switch (_context7.prev = _context7.next) {
            case 0:
              graphRepository = this._graphRepository;
              _context7.next = 1;
              return graphRepository.execute((0, _SQLFlavorManager.getQuery)('property_keys'));
            case 1:
              queryResult = _context7.sent;
              return _context7.abrupt("return", queryResult.rows);
            case 2:
            case "end":
              return _context7.stop();
          }
        }, _callee7, this);
      }));
      function getPropertyKeys() {
        return _getPropertyKeys.apply(this, arguments);
      }
      return getPropertyKeys;
    }()
  }, {
    key: "getRole",
    value: function () {
      var _getRole = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee8() {
        var graphRepository, queryResult;
        return _regenerator["default"].wrap(function (_context8) {
          while (1) switch (_context8.prev = _context8.next) {
            case 0:
              graphRepository = this._graphRepository;
              _context8.next = 1;
              return graphRepository.execute((0, _SQLFlavorManager.getQuery)('get_role'), [this.getConnectionInfo().user]);
            case 1:
              queryResult = _context8.sent;
              return _context8.abrupt("return", queryResult.rows[0]);
            case 2:
            case "end":
              return _context8.stop();
          }
        }, _callee8, this);
      }));
      function getRole() {
        return _getRole.apply(this, arguments);
      }
      return getRole;
    }()
  }, {
    key: "connectDatabase",
    value: function () {
      var _connectDatabase = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee9(connectionInfo) {
        var graphRepository, client, _t3;
        return _regenerator["default"].wrap(function (_context9) {
          while (1) switch (_context9.prev = _context9.next) {
            case 0:
              graphRepository = this._graphRepository;
              if (graphRepository == null) {
                this._graphRepository = new _GraphRepository["default"](connectionInfo);
                graphRepository = this._graphRepository;
              }
              _context9.prev = 1;
              _context9.next = 2;
              return graphRepository.connect();
            case 2:
              client = _context9.sent;
              client.release();
              _context9.next = 4;
              break;
            case 3:
              _context9.prev = 3;
              _t3 = _context9["catch"](1);
              this._graphRepository = null;
              throw _t3;
            case 4:
              return _context9.abrupt("return", true);
            case 5:
            case "end":
              return _context9.stop();
          }
        }, _callee9, this, [[1, 3]]);
      }));
      function connectDatabase(_x8) {
        return _connectDatabase.apply(this, arguments);
      }
      return connectDatabase;
    }()
  }, {
    key: "disconnectDatabase",
    value: function () {
      var _disconnectDatabase = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee0() {
        var graphRepository, isRelease;
        return _regenerator["default"].wrap(function (_context0) {
          while (1) switch (_context0.prev = _context0.next) {
            case 0:
              graphRepository = this._graphRepository;
              if (!(graphRepository == null)) {
                _context0.next = 1;
                break;
              }
              console.log('Already Disconnected');
              return _context0.abrupt("return", false);
            case 1:
              _context0.next = 2;
              return this._graphRepository.releaseConnection();
            case 2:
              isRelease = _context0.sent;
              if (!isRelease) {
                _context0.next = 3;
                break;
              }
              this._graphRepository = null;
              return _context0.abrupt("return", true);
            case 3:
              console.log('Failed releaseConnection()');
              return _context0.abrupt("return", false);
            case 4:
            case "end":
              return _context0.stop();
          }
        }, _callee0, this);
      }));
      function disconnectDatabase() {
        return _disconnectDatabase.apply(this, arguments);
      }
      return disconnectDatabase;
    }()
  }, {
    key: "getConnectionStatus",
    value: function () {
      var _getConnectionStatus = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee1() {
        var graphRepository, client, _t4;
        return _regenerator["default"].wrap(function (_context1) {
          while (1) switch (_context1.prev = _context1.next) {
            case 0:
              graphRepository = this._graphRepository;
              if (!(graphRepository == null)) {
                _context1.next = 1;
                break;
              }
              return _context1.abrupt("return", false);
            case 1:
              _context1.prev = 1;
              _context1.next = 2;
              return graphRepository.getConnection();
            case 2:
              client = _context1.sent;
              client.release();
              _context1.next = 4;
              break;
            case 3:
              _context1.prev = 3;
              _t4 = _context1["catch"](1);
              return _context1.abrupt("return", false);
            case 4:
              return _context1.abrupt("return", true);
            case 5:
            case "end":
              return _context1.stop();
          }
        }, _callee1, this, [[1, 3]]);
      }));
      function getConnectionStatus() {
        return _getConnectionStatus.apply(this, arguments);
      }
      return getConnectionStatus;
    }()
  }, {
    key: "getConnectionInfo",
    value: function getConnectionInfo() {
      if (this.isConnected() === false) throw new Error("Not connected");
      return this._graphRepository.getConnectionInfo();
    }
  }, {
    key: "isConnected",
    value: function isConnected() {
      return this._graphRepository != null;
    }
  }, {
    key: "graphRepository",
    get: function get() {
      return this._graphRepository;
    }
  }, {
    key: "convertEdge",
    value: function convertEdge(_ref) {
      var label = _ref.label,
        id = _ref.id,
        start = _ref.start,
        end = _ref.end,
        props = _ref.props;
      return {
        label: label,
        id: "".concat(id.oid, ".").concat(id.id),
        start: "".concat(start.oid, ".").concat(start.id),
        end: "".concat(end.oid, ".").concat(end.id),
        properties: props
      };
    }
  }, {
    key: "parseMeta",
    value: function parseMeta(data) {
      var meta = {
        edges: [],
        nodes: []
      };
      var vertex_name = '_ag_label_vertex';
      var edge_name = '_ag_label_edge';
      data.forEach(function (element, index) {
        if (element.name === vertex_name || element.name === edge_name) {
          return;
        }
        if (element.kind === 'v') meta.nodes.push(element);
        if (element.kind === 'e') meta.edges.push(element);
      });
      return meta;
    }
  }], [{
    key: "analyzeGraph",
    value: function () {
      var _analyzeGraph = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee10(gr) {
        return _regenerator["default"].wrap(function (_context10) {
          while (1) switch (_context10.prev = _context10.next) {
            case 0:
              _context10.next = 1;
              return gr.execute((0, _SQLFlavorManager.getQuery)('analyze_graph'));
            case 1:
            case "end":
              return _context10.stop();
          }
        }, _callee10);
      }));
      function analyzeGraph(_x9) {
        return _analyzeGraph.apply(this, arguments);
      }
      return analyzeGraph;
    }()
  }]);
}();
module.exports = DatabaseService;
//# sourceMappingURL=databaseService.js.map