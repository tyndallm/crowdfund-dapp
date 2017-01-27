import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Navbar, Link, Nav, NavDropdown, MenuItem} from 'react-bootstrap';
import {getFormattedUserAccount} from '../utils/utils';
import {selectAccount} from '../actions/userActions';

class Header extends Component {

    handleSelectAccount = (acctIndex) => {
        const {dispatch} = this.props;
        dispatch(selectAccount(acctIndex));
    }

    render() {

        const {user} = this.props;

        let userAddress = "0x0";
        let userBalance = 0;
        if (user.accounts.length > 0) {
            let selectedAccount = user.accounts[user.selectedAccount];
            userAddress = selectedAccount.address;
            userBalance = selectedAccount.balance;
        }
        return (
            <Navbar>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href="/">Crowdfund hub</a>
                    </Navbar.Brand>
                </Navbar.Header>
                <Nav pullRight>
                    <NavDropdown eventKey={3} title={getFormattedUserAccount(userAddress, userBalance)} id="basic-nav-dropdown">
                        {user.accounts.map((account, index) => 
                            <MenuItem key={index} eventKey={index} onClick={() => this.handleSelectAccount(index)}>{getFormattedUserAccount(account.address, account.balance)}</MenuItem>
                        )}
                      </NavDropdown>
                </Nav>
            </Navbar>
        )
    };  
}

export default connect()(Header);