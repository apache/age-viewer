const express = require('express');
const ag = require('agensgraph');
const CypherService = require('./cypherService')
const AgensDatabaseHelper = require('../db/agensDatabaseHelper')

let router = express.Router();

router.post('/', async (req, res, next) => {

    let agensDatabaseHelper = new AgensDatabaseHelper(req.session.client);

    let cypherService = new CypherService(agensDatabaseHelper);
    let {status, data} = await cypherService.executeCypher(req.body.cmd);

    res.status(status).json(data).end();
});



module.exports = router;
