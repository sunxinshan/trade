var pgPromise = require('pg-promise');
var pgp = pgPromise({}); // blank option

var connectionString = 'postgres://postgres:postgres@localhost:5432/xendit';
if(process.argv.length >= 3)
    connectionString = process.argv[2]

console.log("Connection string : " + connectionString)

var db = pgp(connectionString);

function getAllRate(req, res, next) {
    db.any('SELECT * FROM rail_fx_rate ORDER BY create_time DESC LIMIT 50')
        .then(function (data) {
            res.status(200).json(data);
        }).catch(function (err) {
        return next(err);
    });
}

function deleteFxrate(req, res, next) {
    const uuid = req.params.uuid;
    db.tx(t => {
        return t.batch([t.none('DELETE FROM rail_fx_rate WHERE uuid=($1)', [uuid])]);
    }).then(tx => {
        db.any('SELECT * FROM rail_fx_rate ORDER BY create_time DESC LIMIT 50')
            .then(function (data) {
                res.status(200).json(data);
            }).catch(function (err) {
            return next(err);
        });
    });
}


function getAllDisbursement(req, res, next) {
    db.any('SELECT * FROM disbursment ORDER BY create_time DESC LIMIT 50')
        .then(function (data) {
            res.status(200).json(data.map((singleData) => { return mapDisbursmentToUI(singleData)}));
        }).catch(function (err) {
        return next(err);
    });
}

function getSingleDisbursement(req, res, next) {
    const uuid = req.params.uuid;

    db.one('SELECT * FROM disbursment WHERE uuid=($1) ORDER BY create_time DESC',[uuid])
        .then(function (data) {
            res.status(200).json(mapDisbursmentToUI(data));
        }).catch(function (err) {
        return next(err);
    });
}

function getRailMessagesByDisbursement(req, res, next) {
    const uuid = req.params.uuid;

    db.any('SELECT * FROM rail_message WHERE ref_uuid=($1) ORDER BY create_time DESC',[uuid])
        .then(function (data) {
            res.status(200).json(data);
        }).catch(function (err) {
        return next(err);
    });
}

function getDisbursementMessageByDisbursement(req, res, next) {
    const uuid = req.params.uuid;

    db.any('select * from disbursement_message where disbursment_id = (select disbursment_id::varchar FROM disbursment where uuid=($1)) ORDER BY create_time DESC',[uuid])
        .then(function (data) {
            res.status(200).json(data);
        }).catch(function (err) {
        return next(err);
    });
}

function getDisbursementMessage(req, res, next) {
    const uuid = req.params.uuid;

    db.one('select * from disbursement_message where uuid = ($1) ORDER BY create_time DESC',[uuid])
        .then(function (data) {
            res.status(200).json(data);
        }).catch(function (err) {
        return next(err);
    });
}

function mapDisbursmentToUI(data) {
    return {
        uuid: data.uuid,
        create_time: data.create_time,
        state: data.state,
        sell_amount: data.xendit_sell_amount, // todo add this pat
        buy_amount:data.xendit_buy_amount, // todo
        reference:data.reference,
        disbursment_id:data.disbursment_id,
        currency_pair:data.xendit_currency_pair,
        unique_request_id: data.unique_request_id,
        fx_rate: data.xendit_fx_rate,
        update_time: data.update_time,
        notes:data.notes,
        settlement_cutoff_time:data.xendit_settlement_cutoff_time,
        conversion_id:data.xendit_conversion_id
    }
}

function getRailMessage(req, res, next) {
    const uuid = req.params.uuid;

    db.one('select * from rail_message where uuid = ($1) ORDER BY create_time DESC',[uuid])
        .then(function (data) {
            res.status(200).json(data);
        }).catch(function (err) {
        return next(err);
    });
}

function deleteDisbursement(req, res, next){
    const uuid = req.params.uuid;
    db.tx(t => {
        return t.batch([t.none('DELETE FROM disbursment WHERE uuid=($1)', [uuid])]);
    }).then(tx => {
        db.any('SELECT * FROM disbursment ORDER BY create_time DESC LIMIT 50')
            .then(function (data) {
                res.status(200).json(data);
            }).catch(function (err) {
            return next(err);
        });
    });
}


module.exports = {
    getAllRate,
    deleteFxrate,
    getAllDisbursement,
    getSingleDisbursement,
    getRailMessagesByDisbursement,
    getDisbursementMessageByDisbursement,
    getDisbursementMessage,
    getRailMessage,
    deleteDisbursement
}