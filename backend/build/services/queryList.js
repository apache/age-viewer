"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var fs = require('fs').promises;
var papa = require('papaparse');
var path = require('path');
var readCSV = function readCSV(file, resolve, reject) {
  return papa.parse(file, {
    skipEmptyLines: true,
    transform: function transform(val, col) {
      if (col !== 0) return val;
    },
    complete: function complete(results) {
      resolve(results);
    },
    error: function error(err) {
      reject(err);
    }
  });
};
var getQueryList = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var p, file, results, kwResults;
    return _regenerator["default"].wrap(function (_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          p = path.join(__dirname, "../../misc/graph_kw.csv");
          _context.next = 1;
          return fs.readFile(p, {
            encoding: 'utf-8'
          });
        case 1:
          file = _context.sent;
          _context.next = 2;
          return new Promise(function (resolve, reject) {
            readCSV(file, resolve, reject);
          });
        case 2:
          results = _context.sent;
          kwResults = {
            kw: results.data[0].splice(1),
            relationships: results.data.slice(1)
          };
          res.status(200).json(kwResults).end();
        case 3:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function getQueryList(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();
module.exports = getQueryList;
//# sourceMappingURL=queryList.js.map