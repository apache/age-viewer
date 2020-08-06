class CypherService {
    constructor(agensDatabaseHelper) {
        this._agensDatabaseHelper = agensDatabaseHelper;
    }

    async executeCommand(query) {
        let agensDatabaseHelper = this._agensDatabaseHelper;
        let queryResult = await agensDatabaseHelper.execute(query);
        try {
            let rows = queryResult.rows,
                columns = queryResult.fields.map((d) => d.name);

            let convertedRows = rows.map((row) => {
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

            return {
                rows: convertedRows,
                columns: columns,
            };
        } catch (err) {
            console.log(err);
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
