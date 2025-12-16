"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var Papa = require('papaparse');
var _require = require('../util/ObjectExtras'),
  getDelete = _require.getDelete,
  toAgeProps = _require.toAgeProps;
var QueryBuilder = require('./QueryBuilder');
var GraphCreator = /*#__PURE__*/function () {
  function GraphCreator() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      nodes = _ref.nodes,
      edges = _ref.edges,
      graphName = _ref.graphName,
      dropGraph = _ref.dropGraph;
    (0, _classCallCheck2["default"])(this, GraphCreator);
    this.nodefiles = nodes;
    this.edgefiles = edges;
    this.dropGraph = dropGraph;
    this.graphName = graphName;
    this.nodes = [];
    this.edges = [];
    this.query = {
      graph: {
        drop: null,
        create: null
      },
      labels: [],
      nodes: [],
      edges: []
    };
  }
  return (0, _createClass2["default"])(GraphCreator, [{
    key: "createNodeLabel",
    value: function () {
      var _createNodeLabel = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee(label) {
        var makeLabel;
        return _regenerator["default"].wrap(function (_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              makeLabel = "SELECT create_vlabel('".concat(this.graphName, "', '").concat(label, "');");
              this.query.labels.push(makeLabel);
            case 1:
            case "end":
              return _context.stop();
          }
        }, _callee, this);
      }));
      function createNodeLabel(_x) {
        return _createNodeLabel.apply(this, arguments);
      }
      return createNodeLabel;
    }()
  }, {
    key: "createEdgeLabel",
    value: function () {
      var _createEdgeLabel = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee2(label) {
        var makeLabel;
        return _regenerator["default"].wrap(function (_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              makeLabel = "SELECT create_elabel('".concat(this.graphName, "', '").concat(label, "');");
              this.query.labels.push(makeLabel);
            case 1:
            case "end":
              return _context2.stop();
          }
        }, _callee2, this);
      }));
      function createEdgeLabel(_x2) {
        return _createEdgeLabel.apply(this, arguments);
      }
      return createEdgeLabel;
    }()
  }, {
    key: "createNode",
    value: function () {
      var _createNode = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee3(node, type) {
        var qbuild,
          CREATENODE,
          _args3 = arguments;
        return _regenerator["default"].wrap(function (_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              qbuild = _args3.length > 2 && _args3[2] !== undefined ? _args3[2] : new QueryBuilder({
                graphName: this.graphName,
                returnAs: 'v'
              });
              CREATENODE = "(:".concat(type, " ").concat(toAgeProps(node), ")");
              if (qbuild.clause === '') {
                qbuild.create();
              }
              qbuild.insertQuery(CREATENODE);
              this.query.nodes.push(qbuild.getGeneratedQuery());
            case 1:
            case "end":
              return _context3.stop();
          }
        }, _callee3, this);
      }));
      function createNode(_x3, _x4) {
        return _createNode.apply(this, arguments);
      }
      return createNode;
    }()
  }, {
    key: "createEdge",
    value: function () {
      var _createEdge = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee4(edge, type) {
        var qbuild,
          startv,
          startid,
          endv,
          endid,
          eprops,
          CREATEEDGE,
          _args4 = arguments;
        return _regenerator["default"].wrap(function (_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              qbuild = _args4.length > 2 && _args4[2] !== undefined ? _args4[2] : new QueryBuilder({
                graphName: this.graphName,
                returnAs: 'e'
              });
              startv = getDelete(edge, "start_vertex_type");
              startid = getDelete(edge, "start_id");
              endv = getDelete(edge, "end_vertex_type");
              endid = getDelete(edge, "end_id");
              eprops = edge;
              CREATEEDGE = "MATCH\n            (a:".concat(startv, " {id:'").concat(startid, "'}),\n            (b:").concat(endv, " {id:'").concat(endid, "'})\n            CREATE (a)-[e:").concat(type, " ").concat(toAgeProps(eprops), "]->(b)");
              qbuild.insertQuery(CREATEEDGE);
              this.query.edges.push(qbuild.getGeneratedQuery());
            case 1:
            case "end":
              return _context4.stop();
          }
        }, _callee4, this);
      }));
      function createEdge(_x5, _x6) {
        return _createEdge.apply(this, arguments);
      }
      return createEdge;
    }()
  }, {
    key: "createGraph",
    value: function () {
      var _createGraph = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee5() {
        var drop,
          dropgraph,
          creategraph,
          _args5 = arguments;
        return _regenerator["default"].wrap(function (_context5) {
          while (1) switch (_context5.prev = _context5.next) {
            case 0:
              drop = _args5.length > 0 && _args5[0] !== undefined ? _args5[0] : false;
              if (drop) {
                dropgraph = "SELECT * FROM drop_graph('".concat(this.graphName, "', true);");
                this.query.graph.drop = dropgraph;
              }
              creategraph = "SELECT * FROM create_graph('".concat(this.graphName, "');");
              this.query.graph.create = creategraph;
            case 1:
            case "end":
              return _context5.stop();
          }
        }, _callee5, this);
      }));
      function createGraph() {
        return _createGraph.apply(this, arguments);
      }
      return createGraph;
    }()
  }, {
    key: "readData",
    value: function () {
      var _readData = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee6(file, type, resolve) {
        return _regenerator["default"].wrap(function (_context6) {
          while (1) switch (_context6.prev = _context6.next) {
            case 0:
              Papa.parse(file, {
                complete: function complete(res) {
                  res.errors.forEach(function (e) {
                    if (e.type === 'FieldMismatch') {
                      res.data.splice(e.row, 1);
                    }
                  });
                  var o = {
                    type: type,
                    data: res.data
                  };
                  resolve(o);
                },
                header: true
              });
            case 1:
            case "end":
              return _context6.stop();
          }
        }, _callee6);
      }));
      function readData(_x7, _x8, _x9) {
        return _readData.apply(this, arguments);
      }
      return readData;
    }()
  }, {
    key: "parseData",
    value: function () {
      var _parseData = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee7() {
        var _this = this;
        return _regenerator["default"].wrap(function (_context7) {
          while (1) switch (_context7.prev = _context7.next) {
            case 0:
              this.createGraph(this.dropGraph);
              _context7.next = 1;
              return Promise.all(this.nodefiles.map(function (node) {
                return new Promise(function (resolve) {
                  _this.createNodeLabel(node.originalname);
                  _this.readData(node.buffer.toString('utf8'), node.originalname, resolve);
                });
              }));
            case 1:
              this.nodes = _context7.sent;
              this.nodes.forEach(function (nodeFile) {
                nodeFile.data.forEach(function (n) {
                  _this.createNode(n, nodeFile.type);
                });
              });
              _context7.next = 2;
              return Promise.all(this.edgefiles.map(function (edge) {
                return new Promise(function (resolve) {
                  _this.createEdgeLabel(edge.originalname);
                  _this.readData(edge.buffer.toString('utf8'), edge.originalname, resolve);
                });
              }));
            case 2:
              this.edges = _context7.sent;
              this.edges.forEach(function (edgeFile) {
                edgeFile.data.forEach(function (e) {
                  _this.createEdge(e, edgeFile.type);
                });
              });
              return _context7.abrupt("return", this.query);
            case 3:
            case "end":
              return _context7.stop();
          }
        }, _callee7, this);
      }));
      function parseData() {
        return _parseData.apply(this, arguments);
      }
      return parseData;
    }()
  }]);
}();
;
module.exports = GraphCreator;
//# sourceMappingURL=GraphCreator.js.map