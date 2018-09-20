import React from 'react';
import AccountDetail from './AccountDetail'
import RailMessage from '../rail_message/RailMessage'
import DisbursementMessage from '../disbursement_message/DisbursementMessage'
import {fetchAccount} from '../actions'
import { connect } from 'react-redux'
class Account extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            disbursement: {}
        };
    }

    componentWillMount() {
        console.log("this props in idNo:" + JSON.stringify(this.props.idNo))
        this.props.dispatch(fetchAccount(this.props.idNo, this.props.rail))
    }


    render() {
        return (
            <div>
               <AccountDetail/>
                <br />
                <RailMessage uuid={this.props.currentAccount.uuid} rail={this.props.rail}/>
                <br />
            </div>
        );
    }
}


function select(state) {
    return state
}

export default connect(select)(Account)