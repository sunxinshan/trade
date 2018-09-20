var express = require('express');
var db = require('./db')
var router = express.Router();

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    next();
});

router.get('/fxrate', db.getAllRate);
router.delete('/fxrate/:uuid', db.deleteFxrate);
router.get('/disbursement/disbursementList', db.getAllDisbursement);
router.get('/disbursement/:uuid', db.getSingleDisbursement);
router.get('/disbursement/:uuid/railMessages', db.getRailMessagesByDisbursement);
router.get('/disbursement/:uuid/disbursementMessage', db.getDisbursementMessageByDisbursement);
router.get('/disbursementMessage/:uuid', db.getDisbursementMessage);
router.get('/railMessage/:uuid', db.getRailMessage)
router.delete('/disbursement/:uuid', db.deleteDisbursement)


module.exports = router;