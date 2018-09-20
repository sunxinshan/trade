var pgPromise = require('pg-promise');
var pgp = pgPromise({}); // blank option

var connectionString  = 'postgres://postgres:postgres@localhost:5432/bos';
if(process.argv.length >= 3)
    connectionString = process.argv[2]

console.log("Connection string : " + connectionString)
var db = pgp(connectionString);

function getAllRate(req, res, next) {
    db.any('SELECT * FROM inforex_rate ORDER BY create_time DESC LIMIT 50')
        .then(function (data) {
            var result = data.map((singleData) => { return mapFxrateToUI(singleData)});
            res.status(200).json(result);
        }).catch(function (err) {
        return next(err);
    });
}

function deleteFxrate(req, res, next) {
    const uuid = req.params.uuid;
    console.log("try to delete fxrate with uuid=" + uuid);
    db.tx(t => {
        return t.batch([t.none('DELETE FROM inforex_rate WHERE uuid=($1)', [uuid])]);
    }).then(tx => {
        db.any('SELECT * FROM inforex_rate ORDER BY create_time DESC LIMIT 50')
            .then(function (data) {
                res.status(200).json(data.map((singleData) => { return mapFxrateToUI(singleData)}));
            }).catch(function (err) {
            return next(err);
        });
    });
}


function getAllDisbursement(req, res, next) {
    db.any('SELECT * FROM inforex_transfer ORDER BY create_time DESC LIMIT 50')
        .then(function (data) {
            res.status(200).json(data.map((singleData) => { return mapDisbursmentToUI(singleData)}));
        }).catch(function (err) {
        return next(err);
    });
}

function getSingleDisbursement(req, res, next) {
    const uuid = req.params.uuid;

    db.one('SELECT * FROM inforex_transfer WHERE uuid=($1) ORDER BY create_time DESC',[uuid])
        .then(function (data) {
            res.status(200).json(mapDisbursmentToUI(singleData));
        }).catch(function (err) {
        return next(err);
    });
}

function getRailMessagesByDisbursement(req, res, next) {
    const uuid = req.params.uuid;
    console.log("get rail message by uuid:" + uuid);
    db.any('SELECT * FROM message_history WHERE ref_uuid = ($1) ORDER BY create_time DESC',[uuid])
        .then(function (data) {
            res.status(200).json(data.map((singleData) => { return mapRailMessageToUI(singleData)}));
        }).catch(function (err) {
        return next(err);
    });
}

function getDisbursementMessageByDisbursement(req, res, next) {
    const uuid = req.params.uuid;
    console.log("get disbusment message for uuid:" + uuid)
    db.any('select * from disbursement_message where disbursment_id = (select disbursment_id::varchar FROM inforex_transfer where uuid=($1)) ORDER BY create_time DESC',[uuid])
        .then(function (data) {
            res.status(200).json(data.map((singleData) => { return mapDisbursmentMessageToUI(singleData)}));
        }).catch(function (err) {
        return next(err);
    });
}

function getAccountByIdNo(req, res, next) {
    const idNo = req.params.idNo;
    console.log("get account by idNo1:" + idNo)
    db.one('select * from account where id_no=($1) ORDER BY create_time DESC',[idNo])
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
            res.status(200).json(mapDisbursmentMessageToUI(data));
        }).catch(function (err) {
        return next(err);
    });
}

function getRailMessage(req, res, next) {
    const uuid = req.params.uuid;

    db.one('select * from rail_message where uuid = ($1) ORDER BY create_time DESC',[uuid])
        .then(function (data) {
            res.status(200).json(mapRailMessageToUI(data));
        }).catch(function (err) {
        return next(err);
    });
}

function deleteDisbursement(req, res, next){
    const uuid = req.params.uuid;
    db.tx(t => {
        return t.batch([t.none('DELETE FROM inforex_transfer WHERE uuid=($1)', [uuid])]);
    }).then(tx => {
        db.any('SELECT * FROM inforex_transfer ORDER BY create_time DESC LIMIT 50')
            .then(function (data) {
                res.status(200).json(data);
            }).catch(function (err) {
            return next(err);
        });
    });
}
function mapDisbursmentMessageToUI(data) {
    return {
        uuid: data.uuid,
        create_time: data.create_time,
        direction: data.direction,
        action: data.action,
        request_message: data.req_msg,
        response_message:data.res_msg,
        disbursment_id:data.disbursment_id,
        unique_request_id: data.unique_request_id
    }
}

function mapRailMessageToUI(data) {
    return {
        uuid: data.uuid,
        create_time: data.create_time,
        direction: data.direction,
        action: data.action,
        request_message: data.rawReqMsg,
        response_message:data.rawResMsg,
        ref_uuid:data.ref_uuid
    }
}

function mapDisbursmentToUI(data) {
    return {
        uuid: data.uuid,
        create_time: data.create_time,
        update_time:data.update_time,
        state: data.state,
        sell_amount: data.notify_deductAmount,
        buy_amount:data.notify_transAmount,
        reference:data.reference,
        disbursment_id:data.disbursment_id,
        currency_pair:data.source_currency_code + data.target_currency_code,
        unique_request_id: data.unique_request_id,
        fx_rate:data.notify_deductFxRate,
        idNo: data.udr.beneficiary.additionalInfo.personalIdNumber,
        notes:data.notes
    }
}


function mapFxrateToUI(data) {
    var type = "FIX";
    if(data.type == 2) type = "LIVING"
    var status = 'Fail'
    if(data.status == '000000') status = "Sucess"
    return {
        uuid: data.uuid,
        create_time: data.create_time,
        type:type,
        forex_rate: data.bidRate,
        buy_currency: data.quotedCcy,
        sell_currency: data.baseCurrency,
        status: status,
        notes:data.notes
    }
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
    deleteDisbursement,
    getAccountByIdNo
}