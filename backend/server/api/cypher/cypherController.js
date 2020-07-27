let express = require('express');
let ag = require('agensgraph');

let router = express.Router();

router.post('/', function (req, res, next) {
    if (!req.session.client) {
        res.status(500);
    } else {
        let cmd = req.body.cmd;

        const client = new ag.Client(req.session.client);
        client.connect();
        client.query(`set graph_path=${req.session.client.graph}`);
        client.query(cmd, (err, resultSet) => {
            let rows = resultSet.rows, columns = resultSet.fields.map((d) => d.name);

            let convertedRows = rows.map((row) => {
                let convetedObject = {};
                for (let k in row) {
                    if (row[k].hasOwnProperty('start')) {
                        convetedObject[k] = convertEdge(row[k]);
                    } else if (row[k].hasOwnProperty('id')) {
                        convetedObject[k] = convertVertex(row[k]);
                    } else {
                        convetedObject[k] = row[k];
                    }
                }
                return convetedObject;
            });

            result = convertedRows;
            res.status(200).json({
                message: 'OK',
                data: {
                    rows: convertedRows,
                    columns: columns,
                },
            });
            client.end();
        });
    }
});

function convertEdge({ label, id, start, end, props }) {
    return {
        label: label,
        id: `${id.oid}.${id.id}`,
        start: `${start.oid}.${start.id}`,
        end: `${end.oid}.${end.id}`,
        properties: props,
    };
}

function convertVertex({ label, id, props }) {
    return {
        label: label,
        id: `${id.oid}.${id.id}`,
        properties: props,
    };
}

module.exports = router;
