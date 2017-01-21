import React, { Component } from 'react';
import {Navbar, Link, Nav, NavDropdown, MenuItem} from 'react-bootstrap';

class Header extends Component {
    render() {
        return (
            <Navbar>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href="/">Crowdfund hub</a>
                    </Navbar.Brand>
                </Navbar.Header>
            </Navbar>
        )
    };  
}

Header.PropTypes = {
    accounts: React.PropTypes.array
}

export default Header;