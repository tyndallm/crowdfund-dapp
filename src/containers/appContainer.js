import * as React from 'React';
import {connect} from 'react-redux';
import { fetchAccountsAndBalances, fetchCurrentBlockNumber, fetchNetwork } from '../actions/userActions';
import Header from '../components/header';
import {Grid, Col, Row, Alert} from 'react-bootstrap';

class AppContainer extends React.Component {

    componentDidMount() {
        const {dispatch} = this.props;
        dispatch(fetchAccountsAndBalances());
        dispatch(fetchCurrentBlockNumber());
        dispatch(fetchNetwork());
    }

    getNetworkStatusAlert(networkId, currentBlock) {
        let alertStyle = "info";
        let networkDisplayName = "network";

        switch (networkId) {
            case "1":
                alertStyle = "danger";
                networkDisplayName = "Mainnet";
                break;
            case "2":
                alertStyle = "warning";
                networkDisplayName = "Morden";
                break;
            case "3": 
                alertStyle = "info";
                networkDisplayName = "Ropsten";
                break;
            default:
                break;
        }

        return (
            <Alert bsStyle={alertStyle}>
                <strong>Currently on {networkDisplayName} ({networkId})</strong> The current block is {currentBlock}.
            </Alert>
        );
    }

    render() {
        const {children, user} = this.props;

        let currentUser = {};
        if (user.accounts.length > 0) {
            currentUser = user.accounts[user.selectedAccount];
        }

        let currentBlockNum = this.props.currentBlock;
        let network = this.props.network;

        let content = (
            <div>
                <Grid>
                    <Row>
                        <Col xs={12} md={12}>
                            {this.getNetworkStatusAlert(network, currentBlockNum)}
                            {React.cloneElement(children, { user: currentUser })}
                        </Col>
                    </Row>
                </Grid>
            </div>
        );

        return (
            <div>
                <Header user={user}></Header>
                {content}
            </div>
        );
    }
};

function mapStateToProps(state) {
    return {
        user: state.user,
        currentBlock: state.user.currentBlock,
        network: state.user.network
    }
}

export default connect(mapStateToProps)(AppContainer);