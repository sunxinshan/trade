import React, {Component} from 'react';
import { connect } from 'react-redux'
import {deepOrange500} from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Header from './components/Navigator'


const styles = {
  container: {
    textAlign: 'left',
    paddingTop: 0,
  },
    main: {
        textAlign: 'left',
        paddingLeft: 200,
        paddingTop: 10
    },
};

const muiTheme = getMuiTheme({
  palette: {
    accent1Color: deepOrange500,
  },
});

class Main extends Component {

  render() {
      return (
          <MuiThemeProvider muiTheme={muiTheme}>
            <div style={styles.container}>
                <Header/>
                <div style={styles.main}>
                    {this.props.children}
                </div>
            </div>

          </MuiThemeProvider>
      );
  }
}

function select(state) {
    return state
}

export default connect(select)(Main)
