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
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { connect } from 'react-redux'
import {fetchFxRate, deleteFxRate, DISPATCH_RAIL} from '../actions'


class FxRates extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            fxrates: [],
            showCheckBox:false,
        };
    }

    componentDidMount() {
        console.log("rail is :" + this.props.rail)
        // this.props.dispatch({type: DISPATCH_RAIL, data: this.props.rail})
        this._loadData(this.props.rail)
    }

    _deleteRate(uuid) {
        this.props.dispatch(deleteFxRate(uuid, this.props.rail))
    }

    _loadData() {
        this.props.dispatch(fetchFxRate(this.props.rail))
    }

    render() {

        return (
            <div>

                <Table>
                    <TableHeader displaySelectAll={this.state.showCheckBox} adjustForCheckbox={this.state.showCheckBox}>
                        <TableRow>
                            <TableHeaderColumn>UUID</TableHeaderColumn>
                            <TableHeaderColumn>Create Time</TableHeaderColumn>
                            <TableHeaderColumn>Type</TableHeaderColumn>
                            <TableHeaderColumn>Status</TableHeaderColumn>
                            <TableHeaderColumn>Fx Rate</TableHeaderColumn>
                            <TableHeaderColumn>Sell Currency</TableHeaderColumn>
                            <TableHeaderColumn>Buy Currency</TableHeaderColumn>
                            <TableHeaderColumn colSpan={3}>Notes</TableHeaderColumn>
                            <TableHeaderColumn>Operations</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody displayRowCheckbox={this.state.showCheckBox}>
                        {this.props.fxrate.map(
                            rate => {
                                return (
                                    <TableRow>
                                        <TableRowColumn>{rate.uuid.substring(0, 10)}</TableRowColumn>
                                        <TableRowColumn>{rate.create_time}</TableRowColumn>
                                        <TableRowColumn>{rate.status}</TableRowColumn>
                                        <TableRowColumn>{rate.type}</TableRowColumn>
                                        <TableRowColumn>{rate.forex_rate}</TableRowColumn>
                                        <TableRowColumn>{rate.sell_currency}</TableRowColumn>
                                        <TableRowColumn>{rate.buy_currency}</TableRowColumn>
                                        <TableRowColumn colSpan={3}><TextField
                                            value={rate.notes}
                                            disabled={false}/></TableRowColumn>
                                        <TableRowColumn><RaisedButton label="Delete" onClick={this._deleteRate.bind(this, rate.uuid)}/></TableRowColumn>
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

// only retrieve fx reate realted infromation
function mapStateToProps(state) {
    return  state
}

export default connect(mapStateToProps)(FxRates);