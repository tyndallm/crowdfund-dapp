import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Menu } from 'semantic-ui-react';

class Navigation extends Component {

    render() {
        console.log(this.props);
        return (
            <Menu>
                <Menu.Item header>
                    Crowdfund Dapp
                </Menu.Item>
            </Menu>
        )
    }
}



export default Navigation;