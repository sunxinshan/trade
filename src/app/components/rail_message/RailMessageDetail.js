import React from 'react';
import TextField from 'material-ui/TextField';
import { connect } from 'react-redux'

class RailMessageDetail extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            railMessage: {}
        };
    }

    componentDidMount() {
        console.log("this.props.railMessages >>>" + JSON.stringify(this.props.railMessages));
        console.log("this.props.uuid >>>" + JSON.stringify(this.props.uuid))
        this.setState({ railMessage: this.props.railMessages.filter(it => it.uuid == this.props.uuid)[0]})
    }

    render() {
        return (
            <div>
                <TextField
                    value={this.state.railMessage.uuid}
                    floatingLabelText="UUID"
                    disabled={false}
                    fullWidth={true}>
                </TextField>
                <br />
                <TextField
                    value={this.state.railMessage.direction}
                    floatingLabelText="Direction"
                    disabled={false}>
                </TextField>&nbsp;&nbsp;&nbsp;&nbsp;
                <TextField
                    value={this.state.railMessage.action}
                    floatingLabelText="Action"
                    disabled={false}>
                </TextField>&nbsp;&nbsp;&nbsp;&nbsp;
                <TextField
                    value={this.state.railMessage.ref_uuid}
                    floatingLabelText="Refrence UUID"
                    disabled={false}>
                </TextField>
                <br />

                <TextField
                    value={this.state.railMessage.request_message}
                    floatingLabelText="Request"
                    rowsMax={10}
                    multiLine={true}
                    disabled={false}
                    fullWidth={true}/>
                <TextField
                    value={this.state.railMessage.response_message}
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

export default connect(select)(RailMessageDetail)