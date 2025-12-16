"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.JsonStringify = JsonStringify;
exports.createEdge = createEdge;
exports.createVertex = createVertex;
exports.stringWrap = stringWrap;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
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

function stringWrap(valstr, flavor) {
  return JSON.stringify(valstr);
}
function JsonStringify(flavor, record) {
  var ageJsonStr = '{';
  var isFirst = true;
  for (var _i = 0, _Object$entries = Object.entries(record); _i < _Object$entries.length; _i++) {
    var _Object$entries$_i = (0, _slicedToArray2["default"])(_Object$entries[_i], 2),
      key = _Object$entries$_i[0],
      value = _Object$entries$_i[1];
    if (!isFirst) {
      ageJsonStr = ageJsonStr + ',';
    }
    var valueWrapped = stringWrap(value, flavor);
    ageJsonStr = ageJsonStr + "".concat(key, ":").concat(valueWrapped);
    isFirst = false;
  }
  ageJsonStr = ageJsonStr + '}';
  return ageJsonStr;
}
function createVertex(_x, _x2, _x3, _x4, _x5) {
  return _createVertex.apply(this, arguments);
}
function _createVertex() {
  _createVertex = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee(client, graphPathStr, label, record, flavor) {
    var createQ;
    return _regenerator["default"].wrap(function (_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          createQ = "CREATE (n:".concat(label, " ").concat(JsonStringify(flavor, record), ")");
          if (!(flavor === 'AGE')) {
            _context.next = 1;
            break;
          }
          return _context.abrupt("return", AGECreateVertex(client, graphPathStr, createQ));
        case 1:
          throw new Error("Unknown flavor ".concat(flavor));
        case 2:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return _createVertex.apply(this, arguments);
}
function AGECreateVertex(_x6, _x7, _x8) {
  return _AGECreateVertex.apply(this, arguments);
}
function _AGECreateVertex() {
  _AGECreateVertex = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee2(client, graphPathStr, createQ) {
    return _regenerator["default"].wrap(function (_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 1;
          return client.query("select *\n         from cypher('".concat(graphPathStr, "', $$ ").concat(createQ, " $$) as (a agtype)"));
        case 1:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return _AGECreateVertex.apply(this, arguments);
}
function createEdge(_x9, _x0, _x1, _x10, _x11, _x12, _x13, _x14, _x15) {
  return _createEdge.apply(this, arguments);
}
function _createEdge() {
  _createEdge = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee3(client, label, record, graphPathStr, edgeStartLabel, edgeEndLabel, startNodeName, endNodeName, flavor) {
    var createQ;
    return _regenerator["default"].wrap(function (_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          createQ = "CREATE (:".concat(edgeStartLabel, " {name: ").concat(stringWrap(startNodeName, flavor), "})-[n:").concat(label, " ").concat(JsonStringify(flavor, record), "]->(:").concat(edgeEndLabel, " {name: ").concat(stringWrap(endNodeName, flavor), "})");
          if (!(flavor === 'AGE')) {
            _context3.next = 1;
            break;
          }
          return _context3.abrupt("return", AGECreateEdge(client, graphPathStr, createQ));
        case 1:
          throw new Error("Unknown flavor ".concat(flavor));
        case 2:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
  return _createEdge.apply(this, arguments);
}
function AGECreateEdge(_x16, _x17, _x18) {
  return _AGECreateEdge.apply(this, arguments);
}
function _AGECreateEdge() {
  _AGECreateEdge = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee4(client, graphPathStr, createQ) {
    return _regenerator["default"].wrap(function (_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 1;
          return client.query("select *\n         from cypher('".concat(graphPathStr, "', $$ ").concat(createQ, " $$) as (a agtype)"));
        case 1:
        case "end":
          return _context4.stop();
      }
    }, _callee4);
  }));
  return _AGECreateEdge.apply(this, arguments);
}
//# sourceMappingURL=JsonBuilder.js.map