import React, { Component } from 'react';
import {Navbar, Link, Nav, NavDropdown, MenuItem} from 'react-bootstrap';

class Header extends Component {
    render() {

        const {user} = this.props;

        let userAddress = "";
        if (user.accounts.length > 0) {
            userAddress = user.accounts[user.selectedAccount].address;
        }
        return (
            <Navbar>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href="/">Crowdfund hub</a>
                    </Navbar.Brand>
                </Navbar.Header>
                <Navbar.Text pullRight>
                   {userAddress}
                </Navbar.Text>
            </Navbar>
        )
    };  
}

export default Header;