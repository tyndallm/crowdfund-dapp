import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Menu, Dropdown } from 'semantic-ui-react';
import { getAccountString } from '../utils/textUtils';

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
            selectedDropdown = getAccountString(accounts[selectedAccount]);
        }

        return (
            <Menu
                size={'huge'}
                borderless={true}>
                
                <Menu.Item header>
                    Crowdfund Dapp
                </Menu.Item>

                <Menu.Menu position='right'>
                    <Dropdown item text={selectedDropdown}>
                        <Dropdown.Menu>
                            {accounts.map((account, index) =>
                                <Dropdown.Item 
                                    key={index}
                                    onClick={() => this.props.onHandleSelectAccount(index)}>
                                    {getAccountString(account)}
                                </Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                </Menu.Menu>
            </Menu>
        )
    }
}

export default Navigation;