import axios from 'axios';

export const FETCH_FX_RATE = 'FETCH_FX_RATE';
export const REQUEST_FX_RATE = 'REQUEST_FX_RATE';
export const RECEIVE_FX_RATE = 'RECEIVE_FX_RATE';
export const DELETE_FX_RATE = "DELETE_FX_RATE";
export const RECEIVE_DISBURSEMENT = "RECEIVE_DISBURSEMENT";
export const VIEW_DISBURSEMENT = "VIEW_DISBURSEMENT";
export const RECEIVE_DISBURSMENT_MESSAGE = "RECEIVE_DISBURSMENT_MESSAGE";
export const RECEIVE_RAIL_MESSAGE = "RECEIVE_RAIL_MESSAGE";
export const CURRENT_DISBURSEMENT = "CURRENT_DISBURSEMENT";
export const CURRENT_ACCOUNT = "RECEIVE_ACCOUNT";
// update current rail
export const DISPATCH_RAIL = "DISPATCH_RAIL";
export const GET_BALANCE = "GET_BALANCE";
export const GET_PRICE = "GET_PRICE";

export function fetchFxRate(rail){
    return dispatch => {
        return axios.get("/" + rail + "/fxrate").then(res => {
            dispatch(receiveFxRates(res.data))
        })
    }
}

export function deleteFxRate(uuid, rail){
    return dispatch => {
        return axios.delete("/" + rail + "/fxrate/"+uuid).then(res => {
            dispatch(receiveFxRates(res.data))
        })
    }
}

export function fetchDisbursements(rail) {
    return dispatch => {
        return axios.get("/" + rail + "/disbursement/disbursementList").then(res => {
            dispatch(receiveDisbursement(res.data))
        })
    }
}

export function fetchBalance() {
    return dispatch => {
        return axios.get( "/trade/getBalance").then(res => {
            dispatch(receiveBalance(res.data))
        })
    }
}

export function fetchPrice() {
    return dispatch => {
        return axios.get( "/trade/getPrice").then(res => {
            dispatch(receivePrice(res.data))
        })
    }
}

export function deleteDisbursment(uuid, rail) {
    return dispatch => {
        return axios.delete("/" + rail + "/disbursement/"+uuid).then(res => {
            dispatch(receiveDisbursement(res.data))
        })
    }
}

export function fetchDisbursmentMessage(uuid, rail) {
    return dispatch => {
        return axios.get("/" + rail + "/disbursement/"+uuid + "/disbursementMessage").then(res => {
            dispatch(receiveDisbursmentMesssage(res.data))
        }).catch(error => {
            dispatch(receiveDisbursmentMesssage([]))
        })
    }
}

export function fetchRailMessage(uuid, rail) {
    return dispatch => {
        return axios.get("/" + rail + "/disbursement/"+uuid + "/railMessages").then(res => {
            dispatch(receiveRailMesssage(res.data))
        }).catch(error => {
            dispatch(receiveRailMesssage([]))
        })
    }
}

export function fetchAccount(idNo, rail) {
    return dispatch => {
        return axios.get("/" + rail + "/account/" + idNo).then(res => {
            dispatch(receiveAccount(res.data))
        }).catch(error => {
            dispatch(receiveAccount({}))
        })
    }
}



function receiveFxRates(data) {
    return {
        type: RECEIVE_FX_RATE,
        data
    }
}

function receiveDisbursement(data) {
    return {
        type: RECEIVE_DISBURSEMENT,
        data
    }
}

function receiveBalance(data) {
    return {
        type: GET_BALANCE,
        data
    }
}

function receivePrice(data) {
    return {
        type: GET_PRICE,
        data
    }
}

function receiveDisbursmentMesssage(data) {
    return {
        type: RECEIVE_DISBURSMENT_MESSAGE,
        data
    }
}

function receiveRailMesssage(data) {
    return {
        type: RECEIVE_RAIL_MESSAGE,
        data
    }
}

function receiveAccount(data) {
    return {
        type: CURRENT_ACCOUNT,
        data
    }
}
