let express = require('express');
let router = express.Router();

router.get('/', (req, res, next) => {
    let message,
    data = req.session.client;
    if(!data) {
        message = 'Not Connected Database';
        data = null;
    } else {
        message = 'Connected Database';
    }

    res.status(200).send({
        message: message,
        data: data
    }).end();
})

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
