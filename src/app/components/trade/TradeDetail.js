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
import {fetchPrice} from '../actions'
import { connect } from 'react-redux'
class TradeDetail extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            prices: [],
            balance:[]
        };
    }

    componentDidMount() {
        this._loadData()
    }

    _loadData() {
        console.log("testttttt");
        this.props.dispatch(fetchPrice())
    }

    render() {
        return (
             <div>

                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHeaderColumn>Symbol</TableHeaderColumn>
                            <TableHeaderColumn>Price</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody >
                        {this.props.prices.map(
                            singleEntry => {
                                return (
                                    <TableRow>
                                        <TableRowColumn>{singleEntry.symbol}</TableRowColumn>
                                        <TableRowColumn>{singleEntry.price}</TableRowColumn>
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

export default connect(select)(TradeDetail)