class CypherService {
    constructor(agensDatabaseHelper) {
        this._agensDatabaseHelper = agensDatabaseHelper;
    }

    async executeCypher(query) {
        if (!query) {
            throw new Error(`Query Not Valid (Query: ${query})`);
        } else {
            try {
                let resultSet = await this._agensDatabaseHelper.execute(query);
                return this.createResult(resultSet);
            } catch (err) {
                throw err;
            }
        }
    }

    createResult(resultSet) {
        let result = {
            rows: null,
            columns: null,
            rowCount: null,
            command: null,
        };

        let targetItem = resultSet;
        if (Array.isArray(resultSet)) {
            targetItem = resultSet.pop();
        }

        result = {
            rows: this._convertRowToResult(targetItem),
            columns: this._getColumns(targetItem),
            rowCount: this._getRowCount(targetItem),
            command: this._getCommand(targetItem),
        };
        return result;
    }

    _getColumns(resultSet) {
        return resultSet.fields.map((field) => field.name);
    }

    _getRowCount(resultSet) {
        return resultSet.rowCount;
    }

    _getCommand(resultSet) {
        return resultSet.command;
    }

    _convertRowToResult(resultSet) {
        return resultSet.rows.map((row) => {
            let convetedObject = {};
            for (let k in row) {
                if (row[k].hasOwnProperty('start')) {
                    convetedObject[k] = this.convertEdge(row[k]);
                } else if (row[k].hasOwnProperty('id')) {
                    convetedObject[k] = this.convertVertex(row[k]);
                } else {
                    convetedObject[k] = row[k];
                }
            }
            return convetedObject;
        });
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

module.exports = CypherService;
