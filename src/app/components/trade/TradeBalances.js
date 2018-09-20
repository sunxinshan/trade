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
import {fetchBalance} from '../actions'
import { connect } from 'react-redux'
class TradeBalance extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            balance: []
        };
    }

    componentDidMount() {
        this._loadData()
    }

    _loadData() {
        this.props.dispatch(fetchBalance())
    }

    render() {
        return (
             <div>

                <Table>
                    <TableHeader displaySelectAll={this.state.showCheckBox} adjustForCheckbox={this.state.showCheckBox}>
                        <TableRow>
                            <TableHeaderColumn>Asset</TableHeaderColumn>
                            <TableHeaderColumn>Free</TableHeaderColumn>
                            <TableHeaderColumn>Locked</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody displayRowCheckbox={this.state.showCheckBox}>
                        {this.props.balance.map(
                            singleEntry => {
                                return (
                                    <TableRow>
                                        <TableRowColumn>{singleEntry.asset}</TableRowColumn>
                                        <TableRowColumn>{singleEntry.free}</TableRowColumn>
                                        <TableRowColumn>{singleEntry.locked}</TableRowColumn>
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

export default connect(select)(TradeBalance)