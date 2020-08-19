class ConnectorService {
    constructor(session, agensDatabaseHelper) {
        this._session = session;
        this._agensDatabaseHelper = agensDatabaseHelper;
    }

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

    async connectDatabase() {
        let agensDatabaseHelper = this._agensDatabaseHelper;
        let status, data;
        let isHealth = await agensDatabaseHelper.isHealth();

        if (isHealth) {
            this._session.client = agensDatabaseHelper.toConnectionInfo();
            data = agensDatabaseHelper.toConnectionInfo();
            status = 200;
        } else {
            data = null;
            status = 500;
        }

        return {
            status: status,
            data: data,
        };
    }

    disconnectDatabase() {
        let agensDatabaseHelper = this._agensDatabaseHelper;
        let status = 500,
            data = null;
        try {
            agensDatabaseHelper.releaseConnection();
            this._session.client = null;
            status = 200;
        } catch (err) {
            console.log("Already Disconnected");
        }
        return {
            status: status,
            data: data,
        };
    }

    async getConnectionStatus() {
        let agensDatabaseHelper = this._agensDatabaseHelper;
        let status, data;

        if (await agensDatabaseHelper.isHealth()) {
            data = agensDatabaseHelper.toConnectionInfo();
            status = 200;
        } else {
            data = null;
            status = 500;
        }

        return {
            status: status,
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
