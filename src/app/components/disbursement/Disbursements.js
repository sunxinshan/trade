import React from 'react';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';

import Divider from 'material-ui/Divider';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import NavLink from '../NavLink'
import { connect } from 'react-redux'
import {fetchDisbursements, deleteDisbursment} from "../actions";
import TextField from 'material-ui/TextField';

class Disbursements extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            disbursements: [],
            showCheckBox:false
        };
    }

    componentDidMount() {
        this._loadData()
    }

    _deleteDisbursement(uuid) {
        this.props.dispatch(deleteDisbursment(uuid, this.props.rail))
    }

    _loadData() {
        this.props.dispatch(fetchDisbursements(this.props.rail))
    }

    render() {
        return (
            <div>

                <Table>
                    <TableHeader displaySelectAll={this.state.showCheckBox} adjustForCheckbox={this.state.showCheckBox}>
                        <TableRow>
                            <TableHeaderColumn>DisbursementID</TableHeaderColumn>
                            <TableHeaderColumn colSpan={2}>Create Time</TableHeaderColumn>
                            <TableHeaderColumn>State</TableHeaderColumn>
                            <TableHeaderColumn>Sell_Amount</TableHeaderColumn>
                            <TableHeaderColumn>Buy_Amount</TableHeaderColumn>
                            <TableHeaderColumn>FX Rate</TableHeaderColumn>
                            <TableHeaderColumn>reference</TableHeaderColumn>
                            <TableHeaderColumn>Unqiue_Request_id</TableHeaderColumn>
                            <TableHeaderColumn colSpan={2}>Notes</TableHeaderColumn>
                            <TableHeaderColumn colSpan={3}>Operations</TableHeaderColumn>

                        </TableRow>
                    </TableHeader>
                    <TableBody displayRowCheckbox={this.state.showCheckBox}>
                        {this.props.disbursements.map(
                            disbursement => {
                                return (
                                    <TableRow>
                                        <TableRowColumn>{disbursement.disbursment_id}</TableRowColumn>
                                        <TableRowColumn colSpan={2}>{disbursement.create_time}</TableRowColumn>
                                        <TableRowColumn>{disbursement.state}</TableRowColumn>
                                        <TableRowColumn>{disbursement.sell_amount}</TableRowColumn>
                                        <TableRowColumn>{disbursement.buy_amount}</TableRowColumn>
                                        <TableRowColumn>{disbursement.fx_rate}</TableRowColumn>
                                        <TableRowColumn>{disbursement.reference}</TableRowColumn>
                                        <TableRowColumn>{disbursement.unique_request_id.substring(0, 10)}</TableRowColumn>
                                        <TableRowColumn colSpan={2}>
                                            <TextField
                                            value={disbursement.notes}
                                            disabled={false}/>
                                        </TableRowColumn>
                                        <TableRowColumn colSpan={3}>
                                            <NavLink to={`/${this.props.rail}/disbursement/${disbursement.uuid}`}>View Detail</NavLink>&nbsp;&nbsp;
                                            {/*{if(this.props.rail == 'bosh') { // todo: fix this later*/}
                                            <NavLink to={`/${this.props.rail}/account/${disbursement.idNo}`}>View Account</NavLink>&nbsp;&nbsp;

                                            <FlatButton label="Delete" secondary={true} onClick={this._deleteDisbursement.bind(this, disbursement.uuid)}/>&nbsp;&nbsp;

                                            {/*<RaisedButton label="View Detail" onClick={this._deleteDisbursement.bind(this, disbursement.uuid)}/>
                                            <RaisedButton label="Delete" onClick={this._deleteDisbursement.bind(this, disbursement.uuid)}/>*/}
                                        </TableRowColumn>
                                    </TableRow>
                                )
                            }
                        )}
                    </TableBody>
                </Table>
                <RaisedButton label="Refresh" primary={true} onClick={this._loadData.bind(this)}/>
                <Divider/>
            </div>
        );
    }
}

function select(state) {
    return state
}

export default connect(select)(Disbursements)

