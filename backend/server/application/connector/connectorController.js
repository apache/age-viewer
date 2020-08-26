const express = require('express');
const connectorServiceManager = require('../session/sessionManager');
const router = express.Router();

router.get('', async (req, res, next) => {
    let connectorService = connectorServiceManager.get(req.sessionID);
    if (connectorService.isConnected()) {
        try {
            await connectorService.getConnectionStatus();
            res.status(200).json(connectorService.getConnectionInfo()).end();
        } catch (err) {
            let error = new Error(err.message);
            error.status = 500;
            next(error);
        }
    } else {
        let error = new Error('Not connected');
        error.status = 500;
        next(error);
    }
});

router.post('/connect', async (req, res, next) => {
    let connectorService = connectorServiceManager.get(req.sessionID);
    if (connectorService.isConnected()) {
        res.status(200).json(connectorService.getConnectionInfo()).end();
    } else {
        try {
            await connectorService.connectDatabase(req.body);
            res.status(200).json(connectorService.getConnectionInfo()).end();
        } catch (err) {
            let error = new Error(err.message);
            error.status = 500;
            next(error);
        }
    }
});

router.get('/disconnect', async (req, res, next) => {
    let connectorService = connectorServiceManager.get(req.sessionID);
    if (connectorService.isConnected()) {
        let isDisconnect = await connectorService.disconnectDatabase();

        if (isDisconnect) {
            res.status(200).json({ msg: 'Disconnect Successful' }).end();
        } else {
            res.status(500).json({ msg: 'Already Disconnected' }).end();
        }
    } else {
        let error = new Error('Not connected');
        error.status = 500;
        next(error);
    }
});

router.get('/meta', async (req, res, next) => {
    let connectorService = connectorServiceManager.get(req.sessionID);
    if (connectorService.isConnected()) {
        let metadata = null;
        try {
            metadata = await connectorService.getMetaData();
            res.status(200).json(metadata).end();
        } catch (error) {
            res.status(500).json(metadata).end();
        }
    } else {
        let error = new Error('Not connected');
        error.status = 500;
        next(error);
    }
});

module.exports = router;
