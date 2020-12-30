const ConnectorService = require('../services/databaseService');
const connectorServiceManager = require('../services/sessionService');

function sessionRouter(req, res, next) {
    if (connectorServiceManager.get(req.sessionID) == null) {
        connectorServiceManager.put(req.sessionID, new ConnectorService());
    }
    next();
}

module.exports = sessionRouter;
