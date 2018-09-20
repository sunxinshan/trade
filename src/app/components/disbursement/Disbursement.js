import React from 'react';
import axios from 'axios';
import DisbursementDetail from './DisbursmentDetail'
import RailMessage from '../rail_message/RailMessage'
import DisbursementMessage from '../disbursement_message/DisbursementMessage'
import {CURRENT_DISBURSEMENT} from '../actions'
import { connect } from 'react-redux'
class Disbursement extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            disbursement: {}
        };
    }

    componentWillMount() {
        console.log("this props in Disbusrment uuid:" + JSON.stringify(this.props.uuid))
        this.props.dispatch({type: CURRENT_DISBURSEMENT, data : this.props.disbursements.filter(it => it.uuid == this.props.uuid)[0]})
    }


    render() {
        return (
            <div>
               <DisbursementDetail/>
                <br />
                <RailMessage uuid={this.props.uuid} rail={this.props.rail}/>
                <br />
                <DisbursementMessage uuid={this.props.uuid} rail={this.props.rail}/>
            </div>
        );
    }
}


function select(state) {
    return state
}

export default connect(select)(Disbursement)