import React from 'react';
import TextField from 'material-ui/TextField';
import { connect } from 'react-redux'

class disbursementMessageDetail extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            disbursementMessage: {}
        };
    }

    componentDidMount() {
        this.setState({ disbursementMessage: this.props.disbursementMessages.filter(it => it.uuid == this.props.uuid)[0]})
    }

    render() {
        return (
            <div>
                <TextField
                    value={this.state.disbursementMessage.uuid}
                    floatingLabelText="UUID"
                    disabled={false}
                    fullWidth={true}>
                </TextField>
                <br />
                <TextField
                    value={this.state.disbursementMessage.direction}
                    floatingLabelText="Direction"
                    disabled={false}>
                </TextField>&nbsp;&nbsp;&nbsp;&nbsp;
                <TextField
                    value={this.state.disbursementMessage.action}
                    floatingLabelText="Action"
                    disabled={false}>
                </TextField>&nbsp;&nbsp;&nbsp;&nbsp;
                <TextField
                    value={this.state.disbursementMessage.disbursment_id}
                    floatingLabelText="Disbusement ID"
                    disabled={false}>
                </TextField>
                <br />
                <TextField
                    value={this.state.disbursementMessage.request_message}
                    floatingLabelText="Request"
                    rowsMax={10}
                    multiLine={true}
                    disabled={false}
                    fullWidth={true}/>
                <TextField
                    value={this.state.disbursementMessage.response_message}
                    floatingLabelText="Response"
                    rowsMax={10}
                    multiLine={true}
                    disabled={false}
                    fullWidth={true}/>

            </div>
        );
    }
}

function select(state) {
    return state
}

export default connect(select)(disbursementMessageDetail)