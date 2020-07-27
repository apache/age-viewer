let express = require('express');
let DatabaseInfo = require('./DatabaseInfo');
let router = express.Router();


router.post('/connect', (req, res, next) => {
    let connInfo = req.body;
    if(!req.session.client) {
        try {
            req.session.client = connInfo;
            res.status(200).send({
                message: 'Successful Connected',
                data: connInfo
            }).end();
        } catch (e) {
            console.log(e);
            res.status(500).send({
                message: 'Failed Connect',
                data: {
                    'Error': e
                }
            }).end();
        }
    } else {
        res.status(200).json({
            message: 'Already Connected',
            data: {
                host: req.session.client.host,
                port: req.session.client.port,
                database: req.session.client.database
            }
        }).end();
    }
});

router.get('/disconnect', (req, res, next) => {
    if(!!req.session.client) {
        req.session.client = null;
        res.status(200).send('disconnect database').end();
    } else {

    }
    res.send('disconnect database');
});

module.exports = router;
