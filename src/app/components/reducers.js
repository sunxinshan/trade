import { combineReducers } from 'redux'
import {
    RECEIVE_FX_RATE, RECEIVE_DISBURSEMENT, VIEW_DISBURSEMENT, RECEIVE_DISBURSMENT_MESSAGE,
    RECEIVE_RAIL_MESSAGE, CURRENT_DISBURSEMENT, DISPATCH_RAIL, CURRENT_ACCOUNT, GET_BALANCE,
    GET_PRICE
} from './actions'

function fxrate(state= [], action) {
    switch(action.type) {
        case RECEIVE_FX_RATE: {
            return Object.assign([], action.data)
        }
        default: return state
    }
}

function disbursements(state=[], action) {
    switch(action.type) {
        case RECEIVE_DISBURSEMENT: {
            return Object.assign([], action.data)
        }
        case VIEW_DISBURSEMENT: {
            return state.filter(it => it.uuid == action.uuid)
        }
        default:
            return state
    }
}

function disbursementMessages(state= [], action) {
    switch(action.type) {
        case RECEIVE_DISBURSMENT_MESSAGE: {
            return Object.assign([], action.data)
        }
        default: return state
    }
}

function railMessages(state= [], action) {
    switch(action.type) {
        case RECEIVE_RAIL_MESSAGE: {
            return Object.assign([], action.data)
        }
        default: return state
    }
}

function currentDisbursement(state= {}, action) {
    switch(action.type) {
        case CURRENT_DISBURSEMENT: {
            console.log("current reducer data=" + JSON.stringify(action.data))
            return Object.assign({}, action.data)
        }
        default: return state
    }
}

function currentAccount(state={}, action) {
    switch(action.type) {
        case CURRENT_ACCOUNT: {
            return Object.assign({}, action.data)
        }
        default: return state;
    }
}

function balance(state=[], action) {
    switch(action.type) {
        case GET_BALANCE: {
            return Object.assign([], action.data)
        }
        default: return state;
    }
}

function prices(state=[], action) {
    switch(action.type) {
        case GET_PRICE: {
            return Object.assign([], [action.data])
        }
        default: return state;
    }
}

const rootReducer = combineReducers({
    balance,
    prices
})

export default rootReducer;