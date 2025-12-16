"use strict";

var express = require('express');
var _require = require('../common/Routes'),
  wrap = _require.wrap;
var getQueryList = require('../services/queryList');
var router = express.Router();
router.get('/', wrap(getQueryList));
module.exports = router;
//# sourceMappingURL=miscellaneous.js.map