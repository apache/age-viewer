const express = require('express');
const ag = require('agensgraph');
const ResponseModel = require('../model/responseModel')
const CypherService = require('./cypherService')
const AgensDatabaseHelper = require('../db/agensDatabaseHelper')

let router = express.Router();

router.post('/', async (req, res, next) => {
    let responseModel = new ResponseModel('', null);
    let agensDatabaseHelper = new AgensDatabaseHelper(req.session.client);
    let query = req.body.cmd

    if (agensDatabaseHelper.isHealth()) {
        let cypherService = new CypherService(agensDatabaseHelper);
        let executeResult = await cypherService.executeCommand(query);

        responseModel.message = "OK"
        responseModel.data = executeResult;

        res.status(200).json(responseModel).end();
    } else if(!query) {
        responseModel.message = 'Query is not valid'
        responseModel.data = {cmd: query};
        res.status(400).json(responseModel).end();
    } else {
        responseModel.message = 'ConnectionInfo is not valid'
        responseModel.data = agensDatabaseHelper.toConnectionInfo();
        res.status(500).json(responseModel).end();
    }
});



module.exports = router;
