const express = require('express');
const CypherService = require('../services/cypherService')
const sessionManager = require('../services/sessionService');
let router = express.Router();

router.post('', async (req, res, next) => {
    let connectorService = sessionManager.get(req.sessionID)
    if (connectorService.isConnected()) {
        try {
            let cypherService = new CypherService(connectorService.agensDatabaseHelper);
            let data = await cypherService.executeCypher(req.body.cmd);
            res.status(200).json(data).end();
        } catch(err){
            err.status = 500;
            next(err);
        }
    } else {
        let error = new Error('Not connected');
        error.status = 500;
        next(error);
    }
});



module.exports = router;
