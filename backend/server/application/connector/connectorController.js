const express = require('express');
const ResponseModel = require('../model/responseModel');
const ConnectorService = require('./connectorService')
const AgensDatabaseHelper = require('../db/agensDatabaseHelper');
const router = express.Router();

router.get('/', (req, res, next) => {
    let agensDatabaseHelper = new AgensDatabaseHelper(req.session.client);

    let connectorService = new ConnectorService(req.session, agensDatabaseHelper);
    let {status, message, data} = connectorService.getConnectionStatus();

    res.status(status).json(new ResponseModel(message, data).toJSON()).end();
});

router.post('/connect', (req, res, next) => {
    let agensDatabaseHelper = new AgensDatabaseHelper(req.body);

    let connectorService = new ConnectorService(req.session, agensDatabaseHelper);
    let {status, message, data} = connectorService.connectDatabase();

    res.status(status).json(new ResponseModel(message, data).toJSON()).end();
});

router.get('/disconnect', (req, res, next) => {
    let agensDatabaseHelper = new AgensDatabaseHelper(req.session.client);

    let connectorService = new ConnectorService(req.session, agensDatabaseHelper);
    let {status, message, data} = connectorService.disconnectDatabase();

    res.status(status).json(new ResponseModel(message, data).toJSON()).end();
});

router.get('/meta', async (req, res, next) => {
    let agensDatabaseHelper = new AgensDatabaseHelper(req.session.client);

    let connectorService = new ConnectorService(req.session, agensDatabaseHelper);
    let metadata = await connectorService.getMetaData();

    res.status(200).json(new ResponseModel("OK", metadata).toJSON()).end();
});

module.exports = router;
