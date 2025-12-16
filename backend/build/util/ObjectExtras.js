"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var getDelete = function getDelete(ob, name) {
  var val = ob[name];
  delete ob[name];
  return val;
};
var toAgeProps = function toAgeProps(data) {
  var empty = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var props = [];
  Object.entries(data).forEach(function (_ref) {
    var _ref2 = (0, _slicedToArray2["default"])(_ref, 2),
      k = _ref2[0],
      v = _ref2[1];
    var val = typeof v === 'string' ? "'".concat(v, "'") : v;
    props.push("".concat(k, ":").concat(val));
  });
  if (!empty && Object.keys(data).length === 0) return '';
  return "{".concat(props.join(', '), "}");
};
module.exports = {
  getDelete: getDelete,
  toAgeProps: toAgeProps
};
//# sourceMappingURL=ObjectExtras.js.map