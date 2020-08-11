const express = require('express');
const ag = require('agensgraph');
const ResponseModel = require('../model/responseModel')
const CypherService = require('./cypherService')
const AgensDatabaseHelper = require('../db/agensDatabaseHelper')

let router = express.Router();

router.post('/', async (req, res, next) => {

    let agensDatabaseHelper = new AgensDatabaseHelper(req.session.client);

    let cypherService = new CypherService(agensDatabaseHelper);
    let {status, message, data} = await cypherService.executeCypher(req.body.cmd);

    res.status(status).json(new ResponseModel(message, data).toJSON()).end();
});



module.exports = router;
