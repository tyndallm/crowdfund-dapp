import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Container, Message, Divider } from 'semantic-ui-react';
import Navigation from '../components/navigation';

import {
    fetchAccountsAndBalances,
    setSelectedAccount,
} from '../actions/userActions';

import {
    fetchNetwork,
    fetchBlockNumber,
} from '../actions/networkActions';

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

        let message = `Currently on ${networkDisplayName} (${networkId}) The current block is ${currentBlock}`;
        console.log(message);

        return (
            <Message
                info
                header='Network'
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
            <div>
                <Navigation 
                    user={this.props.user}
                    onHandleSelectAccount={this.handleSelectAccount} />
                {this.getNetworkStatusAlert(netId, curBlockNumber)}
                <Divider />
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
        user: state.user,
        network: state.network,
    };
}

export default connect(mapStateToProps)(AppContainer);