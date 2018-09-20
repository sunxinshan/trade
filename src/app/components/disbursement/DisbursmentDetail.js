import React from 'react';
import { connect } from 'react-redux'
import TextField from 'material-ui/TextField';


class DisbursementDetail extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <TextField
                    value={this.props.currentDisbursement.uuid}
                    floatingLabelText="UUID"
                    disabled={false}
                    fullWidth={true}>
                </TextField>
                <br />
                <TextField
                    value={this.props.currentDisbursement.state}
                    floatingLabelText="State"
                    disabled={false}>
                </TextField>&nbsp;&nbsp;&nbsp;&nbsp;
                <TextField
                    value={this.props.currentDisbursement.reference}
                    floatingLabelText="reference"
                    disabled={false}>
                </TextField>&nbsp;&nbsp;&nbsp;&nbsp;
                <TextField
                    value={this.props.currentDisbursement.disbursment_id}
                    floatingLabelText="Disbusement ID"
                    disabled={false}>
                </TextField>&nbsp;&nbsp;&nbsp;&nbsp;
                <TextField
                    value={this.props.currentDisbursement.unique_request_id}
                    floatingLabelText="Unique Request ID"
                    disabled={false}>
                </TextField>
                <br />
                <TextField
                    value={this.props.currentDisbursement.sell_amount}
                    floatingLabelText="Sell Amount"
                    disabled={false}>
                </TextField>&nbsp;&nbsp;&nbsp;&nbsp;
                <TextField
                    value={this.props.currentDisbursement.buy_amount}
                    floatingLabelText="Buy Amount"
                    disabled={false}>
                </TextField>&nbsp;&nbsp;&nbsp;&nbsp;
                <TextField
                    value={this.props.currentDisbursement.currency_pair}
                    floatingLabelText="Currency Pair"
                    disabled={false}>
                </TextField>&nbsp;&nbsp;&nbsp;&nbsp;
                <TextField
                    value={this.props.currentDisbursement.fx_rate}
                    floatingLabelText="Fx Rate"
                    disabled={false}>
                </TextField>
                <br />
                <TextField
                    value={this.props.currentDisbursement.disbursment_id}
                    floatingLabelText="Disbursment ID"
                    disabled={false}>
                </TextField>&nbsp;&nbsp;&nbsp;&nbsp;
                <TextField
                    value={this.props.currentDisbursement.conversion_id}
                    floatingLabelText="Xendit conversion id"
                    disabled={false}>
                </TextField>&nbsp;&nbsp;&nbsp;&nbsp;
                <TextField
                    value={this.props.currentDisbursement.settlement_cutoff_time}
                    floatingLabelText="Xendit cutoff time"
                    disabled={false}>
                </TextField>&nbsp;&nbsp;&nbsp;&nbsp;
                <TextField
                    value={this.props.currentDisbursement.create_time}
                    floatingLabelText="Create Time"
                    disabled={false}>
                </TextField>&nbsp;&nbsp;&nbsp;&nbsp;
                <TextField
                    value={this.props.currentDisbursement.update_time}
                    floatingLabelText="Last Update Time"
                    disabled={false}>
                </TextField>
                <br />
                <TextField
                    value={this.props.currentDisbursement.notes}
                    floatingLabelText="Notes"
                    rowsMax={4}
                    multiLine={true}
                    disabled={false}
                    fullWidth={true}/>
                {/*<TextField
                    value={JSON.stringify(this.state.disbursement.udr, null, 2)}
                    floatingLabelText="Latest UDR request"
                    rowsMax={10}
                    multiLine={true}
                    disabled={false}
                    fullWidth={true}/>*/}

            </div>
        );
    }
}

function select(state) {
    return state
}

export default connect(select)(DisbursementDetail)
