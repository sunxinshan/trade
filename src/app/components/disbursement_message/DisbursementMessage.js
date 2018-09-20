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
import NavLink from '../NavLink'
import TextField from 'material-ui/TextField';
import { connect } from 'react-redux'
import {fetchDisbursmentMessage} from "../actions";



class DisbursementMessage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            disbursementMessages: [],
            showCheckBox:false
        };
    }

    componentDidMount() {
        this.props.dispatch(fetchDisbursmentMessage(this.props.uuid, this.props.rail))
    }


    render() {
        return (
            <div>
                <label>Disbursment Messages</label>
                <Table>
                    <TableHeader displaySelectAll={this.state.showCheckBox} adjustForCheckbox={this.state.showCheckBox}>
                        <TableRow>
                            <TableHeaderColumn>Direction</TableHeaderColumn>
                            <TableHeaderColumn>Action</TableHeaderColumn>
                            <TableHeaderColumn>Create Time</TableHeaderColumn>
                            <TableHeaderColumn>Request</TableHeaderColumn>
                            <TableHeaderColumn>Response</TableHeaderColumn>
                            <TableHeaderColumn>Operations</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody displayRowCheckbox={this.state.showCheckBox}>
                        {this.props.disbursementMessages.map(
                            disbursementMessage => {
                                return (
                                    <TableRow>
                                        <TableRowColumn>{disbursementMessage.direction}</TableRowColumn>
                                        <TableRowColumn>{disbursementMessage.action}</TableRowColumn>
                                        <TableRowColumn>{disbursementMessage.create_time}</TableRowColumn>
                                        <TableRowColumn>
                                            <TextField
                                            value={disbursementMessage.request_message}
                                            disabled={false}/>
                                        </TableRowColumn>
                                        <TableRowColumn>
                                            <TextField
                                                value={disbursementMessage.response_message}
                                                disabled={false}/></TableRowColumn>
                                        <TableRowColumn><NavLink to={`/${this.props.rail}/disbursements/disbursementMessage/${disbursementMessage.uuid}`}>View Detail</NavLink>&nbsp;&nbsp;&nbsp;&nbsp;</TableRowColumn>
                                    </TableRow>
                                )
                            }
                        )}
                    </TableBody>
                </Table>
                <Divider/>
            </div>
        );
    }
}


function select(state) {
    return state
}

export default connect(select)(DisbursementMessage)
