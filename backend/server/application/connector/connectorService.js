class ConnectorService {
    constructor(session, agensDatabaseHelper) {
        this._session = session;
        this._agensDatabaseHelper = agensDatabaseHelper;
    }

    async getMetaData() {
        let metadata = new Object();
        metadata.nodes = await this.getNodes();
        metadata.edges = await this.getEdges();
        metadata.propertyKeys = await this.getPropertyKeys();
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
        query.push("MATCH(v)");
        query.push("RETURN DISTINCT jsonb_object_keys(v) AS key, 'v' AS key_type");
        query.push("UNION ALL");
        query.push("MATCH(v1) - [e] - (v2)");
        query.push("RETURN DISTINCT jsonb_object_keys(e) AS key, 'e' AS key_type");

        let queryResult = await agensDatabaseHelper.execute(query.join('\n'));
        return queryResult.rows;
    }

    connectDatabase() {
        let agensDatabaseHelper = this._agensDatabaseHelper;
        let status, message, data;

        if (agensDatabaseHelper.isHealth()) {
            this._session.client = agensDatabaseHelper.toConnectionInfo();
            message = 'Successful Connected';
            data = agensDatabaseHelper.toConnectionInfo();
            status = 200;
        } else {
            message = 'Failed Connect';
            data = null;
            status = 500;
        }

        return {
            status: status,
            message: message,
            data: data,
        };
    }

    disconnectDatabase() {
        let status = 200,
            message,
            data = null;

        if (!this._session.client) {
            message = 'Already Disconnected database';
        } else {
            this._session.client = null;
            message = 'Disconnect database';
        }

        return {
            status: status,
            message: message,
            data: data,
        };
    }

    async getConnectionStatus() {
        let agensDatabaseHelper = this._agensDatabaseHelper;
        let status, message, data;

        if (await agensDatabaseHelper.isHealth()) {
            message = 'Connected Database';
            data = agensDatabaseHelper.toConnectionInfo();
            status = 200;
        } else {
            message = 'Not Connected Database';
            data = null;
            status = 500;
        }

        return {
            status: status,
            message: message,
            data: data,
        };
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
