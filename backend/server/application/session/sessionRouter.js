const ConnectorService = require('../connector/connectorService');
const connectorServiceManager = require('./sessionManager');

function sessionRouter(req, res, next) {
    if (connectorServiceManager.get(req.sessionID) == null) {
        connectorServiceManager.put(req.sessionID, new ConnectorService());
    }
    next();
}

module.exports = sessionRouter;
