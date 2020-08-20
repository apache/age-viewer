const sessionManager = require('../session/sessionManager');
const AgensDatabaseHelper = require('../db/agensDatabaseHelper');

class ConnectorService {
    constructor() {}

    async getMetaData() {
        let metadata = new Object();
        try {
            metadata.nodes = await this.getNodes();
            metadata.edges = await this.getEdges();
            metadata.propertyKeys = await this.getPropertyKeys();
        } catch (error) {
            throw error;
        }
        return metadata;
    }

    async getNodes(label) {
        let agensDatabaseHelper = this._agensDatabaseHelper;
        let query = [];
        query.push("MATCH(v) RETURN DISTINCT '*' AS label, count(v) AS cnt");
        query.push('UNION ALL');
        query.push('MATCH(v) RETURN DISTINCT label(v) AS label, count(v) AS cnt');
        query.push('ORDER BY label');

        let queryResult = await agensDatabaseHelper.execute(query.join('\n'));
        return queryResult.rows;
    }

    async getEdges(label) {
        let agensDatabaseHelper = this._agensDatabaseHelper;
        let query = [];
        query.push("MATCH(v) - [e] - (v2) RETURN DISTINCT '*' AS label, count(e) AS cnt");
        query.push('UNION ALL');
        query.push('MATCH(v) - [e] - (v2) RETURN DISTINCT label(e) AS label, count(e) AS cnt');
        query.push('ORDER BY label');

        let queryResult = await agensDatabaseHelper.execute(query.join('\n'));
        return queryResult.rows;
    }

    async getPropertyKeys() {
        let agensDatabaseHelper = this._agensDatabaseHelper;
        let query = [];
        query.push('MATCH(v)');
        query.push("RETURN DISTINCT jsonb_object_keys(v) AS key, 'v' AS key_type");
        query.push('UNION ALL');
        query.push('MATCH(v1) - [e] - (v2)');
        query.push("RETURN DISTINCT jsonb_object_keys(e) AS key, 'e' AS key_type");

        let queryResult = await agensDatabaseHelper.execute(query.join('\n'));
        return queryResult.rows;
    }

    async connectDatabase(connectionInfo) {
        let agensDatabaseHelper = this._agensDatabaseHelper;
        if (agensDatabaseHelper == null) {
            this._agensDatabaseHelper = new AgensDatabaseHelper(connectionInfo);
            agensDatabaseHelper = this._agensDatabaseHelper;
        }

        if (await agensDatabaseHelper.isHealth()) {
            return true;
        } else {
            return false;
        }
    }

    async disconnectDatabase() {
        let agensDatabaseHelper = this._agensDatabaseHelper;
        if (agensDatabaseHelper == null) {
            console.log('Already Disconnected');
            return false;
        } else {
            let isRelease = await this._agensDatabaseHelper.releaseConnection();
            if (isRelease) {
                this._agensDatabaseHelper = null;
                return true;
            } else {
                console.log('Failed releaseConnection()');
                return false;
            }
        }
    }

    async getConnectionStatus() {
        let agensDatabaseHelper = this._agensDatabaseHelper;

        if (agensDatabaseHelper != null && await agensDatabaseHelper.isHealth()) {
            return true;
        } else {
            return false;
        }
    }

    getConnectionInfo() {
        return this._agensDatabaseHelper.toConnectionInfo();
    }

    isConnected() {
        return this._agensDatabaseHelper != null;
    }

    get agensDatabaseHelper() {
        return this._agensDatabaseHelper;
    }

    convertEdge({ label, id, start, end, props }) {
        return {
            label: label,
            id: `${id.oid}.${id.id}`,
            start: `${start.oid}.${start.id}`,
            end: `${end.oid}.${end.id}`,
            properties: props,
        };
    }

    convertVertex({ label, id, props }) {
        return {
            label: label,
            id: `${id.oid}.${id.id}`,
            properties: props,
        };
    }
}

module.exports = ConnectorService;
