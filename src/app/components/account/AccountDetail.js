import React from 'react';
import { connect } from 'react-redux'
import TextField from 'material-ui/TextField';


class AccountDetail extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <TextField
                    value={this.props.currentAccount.uuid}
                    floatingLabelText="UUID"
                    disabled={false}
                    fullWidth={true}>
                </TextField>
                <br />
                <TextField
                    value={this.props.currentAccount.state}
                    floatingLabelText="State"
                    disabled={false}>
                </TextField>&nbsp;&nbsp;&nbsp;&nbsp;
                <TextField
                    value={this.props.currentAccount.id_no}
                    floatingLabelText="ID"
                    disabled={false}>
                </TextField>&nbsp;&nbsp;&nbsp;&nbsp;
                <TextField
                    value={this.props.currentAccount.custName}
                    floatingLabelText="Name"
                    disabled={false}>
                </TextField>
                <TextField
                    value={this.props.currentAccount.name}
                    floatingLabelText="English Name"
                    disabled={false}>
                </TextField>
                <TextField
                    value={this.props.currentAccount.idExpireDate}
                    floatingLabelText="ID exprire Date"
                    disabled={false}>
                </TextField>&nbsp;&nbsp;&nbsp;&nbsp;
                <br  />
                <TextField
                    value={this.props.currentAccount.bindCardNum}
                    floatingLabelText="Bank Card Number"
                    disabled={false}>
                </TextField>
                <TextField
                    value={this.props.currentAccount.reservedPhone}
                    floatingLabelText="Bank reserved phone"
                    disabled={false}>
                </TextField>&nbsp;&nbsp;&nbsp;&nbsp;
                <TextField
                    value={this.props.currentAccount.mobilePhone}
                    floatingLabelText="Moblie phone"
                    disabled={false}>
                </TextField>&nbsp;&nbsp;&nbsp;&nbsp;
                <TextField
                    value={this.props.currentAccount.subacctNo}
                    floatingLabelText="Sub Account Namer"
                    disabled={false}>
                </TextField>&nbsp;&nbsp;&nbsp;&nbsp;
                <br />
                <TextField
                    value={this.props.currentAccount.create_time}
                    floatingLabelText="Create Time"
                    disabled={false}>
                </TextField>&nbsp;&nbsp;&nbsp;&nbsp;
                <TextField
                    value={this.props.currentAccount.update_time}
                    floatingLabelText="Last Update Time"
                    disabled={false}>
                </TextField>
                <br />
                <TextField
                    value={this.props.currentAccount.notes}
                    floatingLabelText="Notes"
                    rowsMax={2}
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

export default connect(select)(AccountDetail)
