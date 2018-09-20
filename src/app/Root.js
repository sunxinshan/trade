import React from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Main from './Main';
import {IndexRoute, Router, Route, browserHistory} from 'react-router'
import {hashHistory} from 'react-router'
import Dashboard from "./components/Dashboard";
import Disbursements from './components/disbursement/Disbursements'
import Disbursement from './components/disbursement/Disbursement'
import DisbursementMessageDetail from './components/disbursement_message/DisbursmentMessageDetail'
import RailMessageDetail from './components/rail_message/RailMessageDetail'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import rootReducer from './components/reducers'
import FxRates from "./components/fxrate/FxRate"
import { composeWithDevTools } from 'redux-devtools-extension';
import Account from './components/account/Account'
import TradeBalances from './components/trade/TradeBalances';
import TradeDetail from './components/trade/TradeDetail';

const loggerMiddleware = createLogger()

let store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunkMiddleware, loggerMiddleware)))

export default class Root extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <Router history={hashHistory} >
                    <Route path="/" component={Main}>
                        <IndexRoute component={Dashboard}/>
                        <Route path="/xendit">
                            <Route path="disbursements" component={() => <Disbursements rail="xendit"/>}/>
                            <Route path="disbursements/disbursementMessage/:uuid" component={(configure) => <DisbursementMessageDetail rail="xendit" uuid={configure.params.uuid}/> }/>
                            <Route path="disbursements/railMessage/:uuid" component={(configure) => <RailMessageDetail rail="xendit"  uuid={configure.params.uuid}/> }/>
                            <Route path="disbursement/:uuid" component={(configure) => <Disbursement rail="xendit" uuid={configure.params.uuid}/>}/>
                            <Route path="fxrates" component={() => <FxRates rail="xendit"/>}/>
                        </Route>

                        <Route path="/bosh">
                            <Route path="getBalance" component={() => <GetTradeBalance rail="bosh"/>}/>
                            <Route path="disbursements" component={() => <Disbursements rail="bosh"/>}/>
                            <Route path="disbursement/:uuid" component={(configure) => <Disbursement rail="bosh" uuid={configure.params.uuid}/>}/>
                            <Route path="disbursements/disbursementMessage/:uuid" component={(configure) => <DisbursementMessageDetail rail="bosh" uuid={configure.params.uuid}/> }/>
                            <Route path="disbursements/railMessage/:uuid" component={(configure) => <RailMessageDetail rail="bosh"  uuid={configure.params.uuid}/> }/>
                            <Route path="account/:idNo" component={(configure) => <Account rail="bosh"  idNo={configure.params.idNo}/> }/>
                        </Route>
                        <Route path="/trade">
                            <Route path="getBalance" component={() => <TradeBalances/>}/>
                            <Route path="tradeDetail" component={() => <TradeDetail/>}/>
                        </Route>
                    </Route>
                </Router>
            </Provider>
        )
    }
}

