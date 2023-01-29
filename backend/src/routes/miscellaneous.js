const express = require('express');
const { wrap } = require('../common/Routes');
const getQueryList = require('../services/queryList');
const router = express.Router();


router.get('/', wrap(getQueryList));

module.exports = router;