let express = require('express');
let ag = require('agensgraph');

let DatabaseInfo = require('../database/DatabaseInfo');

let router = express.Router();

router.post('/', function (req, res, next) {
    let cmd = req.body.cmd;
    if(!req.session.client) {
        res.status(500);
    } else {
        let clientInfo = req.session.client;
        let connInfo = {
            user: clientInfo.user,
            password: clientInfo.password,
            database: clientInfo.database,
            host: clientInfo.host,
            port: clientInfo.port

        }

        const client = new ag.Client(connInfo);
        client.connect();
        client.query(`set graph_path=${clientInfo.graph}`);
        client.query(cmd, (err, resultSet) => {
            if(err) {
                throw err;
            } else {
                console.log(resultSet.rows);
                res.status(200).json(resultSet.rows).end();
            }
        })

    }
});

module.exports = router;
