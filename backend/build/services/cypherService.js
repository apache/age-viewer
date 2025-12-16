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
var CypherService = /*#__PURE__*/function () {
  function CypherService(graphRepository) {
    (0, _classCallCheck2["default"])(this, CypherService);
    this._graphRepository = graphRepository;
  }
  return (0, _createClass2["default"])(CypherService, [{
    key: "executeCypher",
    value: function () {
      var _executeCypher = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee(query) {
        var resultSet, _t;
        return _regenerator["default"].wrap(function (_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              if (query) {
                _context.next = 1;
                break;
              }
              throw new Error('Query not entered!');
            case 1:
              _context.prev = 1;
              _context.next = 2;
              return this._graphRepository.execute(query);
            case 2:
              resultSet = _context.sent;
              return _context.abrupt("return", this.createResult(resultSet));
            case 3:
              _context.prev = 3;
              _t = _context["catch"](1);
              throw _t;
            case 4:
            case "end":
              return _context.stop();
          }
        }, _callee, this, [[1, 3]]);
      }));
      function executeCypher(_x) {
        return _executeCypher.apply(this, arguments);
      }
      return executeCypher;
    }()
  }, {
    key: "createResult",
    value: function createResult(resultSet) {
      var result;
      var targetItem = resultSet;
      if (Array.isArray(resultSet)) {
        targetItem = resultSet.pop();
      }
      var cypherRow = targetItem.rows;
      result = {
        rows: cypherRow,
        columns: this._getColumns(targetItem),
        rowCount: this._getRowCount(targetItem),
        command: this._getCommand(targetItem)
      };
      return result;
    }
  }, {
    key: "_getColumns",
    value: function _getColumns(resultSet) {
      return resultSet.fields.map(function (field) {
        return field.name;
      });
    }
  }, {
    key: "_getRowCount",
    value: function _getRowCount(resultSet) {
      return resultSet.rowCount;
    }
  }, {
    key: "_getCommand",
    value: function _getCommand(resultSet) {
      return resultSet.command;
    }
  }, {
    key: "_convertRowToResult",
    value: function _convertRowToResult(resultSet) {
      var _this = this;
      return resultSet.rows.map(function (row) {
        var convetedObject = {};
        for (var k in row) {
          if (row[k]) {
            var typeName = row[k].constructor.name;
            if (typeName === 'Path') {
              convetedObject[k] = _this.convertPath(row[k]);
            } else if (typeName === 'Vertex') {
              convetedObject[k] = _this.convertVertex(row[k]);
            } else if (typeName === 'Edge') {
              convetedObject[k] = _this.convertEdge(row[k]);
            } else {
              convetedObject[k] = row[k];
            }
          } else {
            convetedObject[k] = null;
          }
        }
        return convetedObject;
      });
    }
  }, {
    key: "convertPath",
    value: function convertPath(_ref) {
      var vertices = _ref.vertices,
        edges = _ref.edges,
        start = _ref.start,
        end = _ref.end,
        len = _ref.len;
      var result = [];
      // vertex
      for (var idx in vertices) {
        result.push(this.convertVertex(vertices[idx]));
      }
      // edge
      for (var _idx in edges) {
        result.push(this.convertEdge(edges[_idx]));
      }
      return result;
    }
  }, {
    key: "convertEdge",
    value: function convertEdge(_ref2) {
      var label = _ref2.label,
        id = _ref2.id,
        start = _ref2.start,
        end = _ref2.end,
        props = _ref2.props;
      return {
        label: label,
        id: "".concat(id.oid, ".").concat(id.id),
        start: "".concat(start.oid, ".").concat(start.id),
        end: "".concat(end.oid, ".").concat(end.id),
        properties: props
      };
    }
  }, {
    key: "convertVertex",
    value: function convertVertex(_ref3) {
      var label = _ref3.label,
        id = _ref3.id,
        props = _ref3.props;
      return {
        label: label,
        id: "".concat(id.oid, ".").concat(id.id),
        properties: props
      };
    }
  }]);
}();
module.exports = CypherService;
//# sourceMappingURL=cypherService.js.map