import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Container, Message, Grid } from 'semantic-ui-react';
import Navigation from '../components/navigation';

import {
    fetchAccountsAndBalances,
    setSelectedAccount,
} from '../actions/userActions';

import {
    fetchNetwork,
    fetchBlockNumber,
} from '../actions/networkActions';

import './appContainer.css';

class AppContainer extends Component {
    
    componentDidMount() {
        const {dispatch} = this.props;
        dispatch(fetchNetwork());
        dispatch(fetchBlockNumber());
        dispatch(fetchAccountsAndBalances());
    }

    handleSelectAccount = (accountIndex) => {
        const {dispatch} = this.props;
        dispatch(setSelectedAccount(accountIndex));
    }

    getNetworkStatusAlert(networkId, currentBlock) {
        let networkDisplayName = "network";

        switch (networkId) {
            case "1":
                networkDisplayName = "Mainnet";
                break;
            case "2": 
                networkDisplayName = "Morden";
                break;
            case "3":
                networkDisplayName = "Ropsten";
                break;
            case "42":
                networkDisplayName = "Kovan";
                break;
            default:
                networkDisplayName = "TestRPC";
                break;
        }

        let message = `Currently on ${networkDisplayName} (${networkId}), the current block is ${currentBlock}.`;
        
        return (
            <Message
                info
                content={message}/>
        )
    }

    render() {
        const { 
            network: {
                network,
                currentBlock
            }
        } = this.props;

        let netId = "";
        let curBlockNumber = 0;

        if (network !== "") {
            netId = network;
        }

        if (currentBlock !== 0) {
            curBlockNumber = currentBlock;
        }

        let content = (
            <div className={'mainContent'}>
                <Navigation 
                    user={this.props.user}
                    onHandleSelectAccount={this.handleSelectAccount} />
                {this.getNetworkStatusAlert(netId, curBlockNumber)}
                <Container>
                    {this.props.children}
                </Container>
            </div>
        );

        return (
            <Grid container>
                {content}
            </Grid>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.user,
        network: state.network,
    };
}

export default connect(mapStateToProps)(AppContainer);