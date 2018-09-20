import React from 'react';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import {ListItem} from 'material-ui/List';
import MenuItem from 'material-ui/MenuItem';
import { Link, IndexLink } from 'react-router'
import NavLink from './NavLink'

class Navigator extends React.Component {

    constructor(props) {
        super(props);
        this.state = {open: true};
    };

    handleToggle = () => this.setState({open: !this.state.open});

    render() {
        return (
            <div>
                <AppBar
                    title="SXS Trade System"
                    iconClassNameRight="muidocs-icon-navigation-expand-more"
                    onLeftIconButtonTouchTap={this.handleToggle}
                />
                <Drawer docked={true}
                        width={200}
                        onRequestChange={(open) => this.setState({open})}
                        open={this.state.open}
                        containerStyle={{height: 'calc(100% - 80px)', top: 80}}>
                        <ListItem
                        primaryText="Trade"
                        // leftIcon={<ContentInbox />}
                        initiallyOpen={true}
                        primaryTogglesNestedList={true}
                        nestedItems={[
                            <ListItem
                                key={1}
                            ><NavLink to="/trade/getBalance">Balance</NavLink></ListItem>,
                            <ListItem
                                key={2}
                            ><NavLink to="/trade/tradeDetail">Trade</NavLink></ListItem>
                        ]}
                    />
                { /*   <MenuItem primaryText="RAILS"  />
                        <ListItem
                            primaryText="Xendit"
                            // leftIcon={<ContentInbox />}
                            initiallyOpen={false}
                            primaryTogglesNestedList={true}
                            nestedItems={[
                                <ListItem
                                    key={1}
                                ><NavLink to="/xendit/disbursements">Disbursment</NavLink></ListItem>,
                                <ListItem
                                    key={2}
                                ><NavLink to="/xendit/fxrates">FxRate</NavLink></ListItem>
                            ]}
                        />

                    <ListItem
                        primaryText="BOSH"
                        // leftIcon={<ContentInbox />}
                        initiallyOpen={true}
                        primaryTogglesNestedList={true}
                        nestedItems={[
                            <ListItem
                                key={1}
                            ><NavLink to="/bosh/disbursements">Disbursment</NavLink></ListItem>,
                            <ListItem
                                key={2}
                            ><NavLink to="/bosh/fxrates">FxRate</NavLink></ListItem>
                        ]}
                    />
                    
                    <ListItem
                        primaryText="Trade"
                        // leftIcon={<ContentInbox />}
                        initiallyOpen={true}
                        primaryTogglesNestedList={true}
                        nestedItems={[
                            <ListItem
                                key={1}
                            ><NavLink to="/trade/getBalance">Balance</NavLink></ListItem>,
                            <ListItem
                                key={2}
                            ><NavLink to="/trade/getTrades">Trade</NavLink></ListItem>
                        ]}
                    />
                            */}
                    <MenuItem ><IndexLink to="/" activeClassName="active">DashBoard</IndexLink></MenuItem>
                    {/*<MenuItem ><NavLink to="/todo" activeClassName="active">TODOs</NavLink></MenuItem>*/}

                </Drawer>
            </div>
        );
    }
}



export default Navigator;