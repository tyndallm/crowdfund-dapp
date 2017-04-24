import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Container } from 'semantic-ui-react';
import Navigation from '../components/navigation';

import {
    fetchAccountsAndBalances,
    setSelectedAccount,
} from '../actions/userActions';

class AppContainer extends Component {
    
    componentDidMount() {
        const {dispatch} = this.props;
        console.log("appContainer.componentDidMount()");
        dispatch(fetchAccountsAndBalances());
    }

    handleSelectAccount = (accountIndex) => {
        const {dispatch} = this.props;
        dispatch(setSelectedAccount(accountIndex));
    }

    render() {
        let content = (
            <div>
                <Navigation 
                    user={this.props.user}
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