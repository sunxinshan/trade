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
import {fetchRailMessage} from "../actions"


class RailMessage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            railMessages: [],
            showCheckBox:false
        };
    }

    componentDidMount() {
        this.props.dispatch(fetchRailMessage(this.props.uuid, this.props.rail))
    }

    render() {
        return (
            <div>
                <label>Rail Messages</label>
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
                        {this.props.railMessages.map(
                            railMessage => {
                                return (
                                    <TableRow>
                                        <TableRowColumn>{railMessage.direction}</TableRowColumn>
                                        <TableRowColumn>{railMessage.action}</TableRowColumn>
                                        <TableRowColumn>{railMessage.create_time}</TableRowColumn>
                                        <TableRowColumn>
                                            <TextField
                                            value={railMessage.request_message}
                                            disabled={false}/>
                                        </TableRowColumn>
                                        <TableRowColumn>
                                            <TextField
                                                value={railMessage.response_message}
                                                disabled={false}/></TableRowColumn>
                                        <TableRowColumn><NavLink to={`/${this.props.rail}/disbursements/railMessage/${railMessage.uuid}`}>View Detail</NavLink>&nbsp;&nbsp;&nbsp;&nbsp;</TableRowColumn>
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

export default connect(select)(RailMessage)