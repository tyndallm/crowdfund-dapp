import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Menu, Dropdown, Container } from 'semantic-ui-react';
import { getFormattedUserAccount } from '../utils/textUtils';

class Navigation extends Component {

    render() {
        const {
            user: { 
                accounts,
                selectedAccount 
            }
        } = this.props;

        let selectedDropdown = "";
        if (accounts.length > 0) {
            selectedDropdown = getFormattedUserAccount(accounts[selectedAccount]);
        }

        return (
            <Menu
                size={'huge'}
                borderless={true}
                fixed={'top'}>

                <Container>
                
                <Menu.Item header>
                    <a href='/'>Crowdfund Dapp</a>
                </Menu.Item>

                <Menu.Menu position='right'>
                    <Dropdown item text={selectedDropdown}>
                        <Dropdown.Menu>
                            {accounts.map((account, index) =>
                                <Dropdown.Item 
                                    key={index}
                                    onClick={() => this.props.onHandleSelectAccount(index)}>
                                    {getFormattedUserAccount(account)}
                                </Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                </Menu.Menu>
                </Container>
            </Menu>
        )
    }
}

export default Navigation;