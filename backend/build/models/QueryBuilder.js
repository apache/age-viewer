"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var QueryBuilder = /*#__PURE__*/function () {
  function QueryBuilder() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      graphName = _ref.graphName,
      _ref$returnAs = _ref.returnAs,
      returnAs = _ref$returnAs === void 0 ? 'x' : _ref$returnAs;
    (0, _classCallCheck2["default"])(this, QueryBuilder);
    this._graphName = graphName;
    this.ends = {
      start: "SELECT * FROM cypher('".concat(this._graphName, "', $$"),
      end: "$$) as (".concat(returnAs, " agtype);")
    };
    this.clause = '';
    this.middle = [];
  }
  return (0, _createClass2["default"])(QueryBuilder, [{
    key: "startQuery",
    value: function startQuery(_startQuery) {
      this.ends.start = _startQuery;
    }
  }, {
    key: "insertQuery",
    value: function insertQuery(clause) {
      this.middle.push(clause);
    }
  }, {
    key: "create",
    value: function create() {
      this.clause = 'CREATE ';
    }
  }, {
    key: "endQuery",
    value: function endQuery(_endQuery) {
      this.ends.end = _endQuery;
    }
  }, {
    key: "getGeneratedQuery",
    value: function getGeneratedQuery() {
      return (this.ends.start + this.clause + this.middle.join(', ') + this.ends.end).trim();
    }
  }]);
}();
module.exports = QueryBuilder;
//# sourceMappingURL=QueryBuilder.js.map