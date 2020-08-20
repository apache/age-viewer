class CypherService {
    constructor(agensDatabaseHelper) {
        this._agensDatabaseHelper = agensDatabaseHelper;
    }

    async executeCypher(query) {
        let agensDatabaseHelper = this._agensDatabaseHelper;
        let data;

        if (!query) {
            data = { cmd: query };
            throw new Error("Query Not Valid");
        } else {
            data = await this.getExecuteResult(query);
        }

        return data;
    }

    async getExecuteResult(query) {
        let agensDatabaseHelper = this._agensDatabaseHelper;
        try {
            let queryResult = await agensDatabaseHelper.execute(query);
            let result = {
                rows: null,
                columns: queryResult.fields.map((field) => field.name),
                rowCount: queryResult.rowCount,
                command: queryResult.command
            }

            result.rows = queryResult.rows.map((row) => {
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

            return result;
        } catch (err) {
            throw err;
        }
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
