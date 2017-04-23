import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Container } from 'semantic-ui-react';
import Navigation from '../components/navigation';

import {fetchAccountsAndBalances} from '../actions/userActions';

class AppContainer extends Component {
    
    componentDidMount() {
        const {dispatch} = this.props;
        dispatch(fetchAccountsAndBalances);
    }

    handleSelectAccount = (accountIndex) => {
        console.log("account selected: " + accountIndex);
    }

    render() {
        console.log(this.props.user);
        let accounts = [];
        console
        if (this.props.user.accounts.length > 0) {
            accounts = this.props.user.accounts;
        }

        let content = (
            <div>
                <Navigation 
                    accounts={accounts}
                    onHandleSelectAccount={this.handleSelectAccount} />
                {this.props.children}
            </div>
        );

        return (
            <Container>
                {content}
            </Container>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.user
    };
}

export default connect(mapStateToProps)(AppContainer);