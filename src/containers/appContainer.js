import * as React from 'React';
import {connect} from 'react-redux';
import { fetchAccountsAndBalances } from '../actions/userActions';
import Header from '../components/header';
import {Grid, Col, Row} from 'react-bootstrap';

// import Web3 from 'web3';

// import truffleConfig from '../../truffle.js';
// import {getExtendedWeb3Provider} from '../utils/Utils.js';

// var web3Location = `http://${truffleConfig.rpc.host}:${truffleConfig.rpc.port}`;
// let web3Provided;

class AppContainer extends React.Component {
    
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const {dispatch} = this.props;
        dispatch(fetchAccountsAndBalances());
    }

    render() {
        const {children, user} = this.props;

        let currentUser = {};
        if (user.accounts.length > 0) {
            currentUser = user.accounts[user.selectedAccount];
            console.log("currentuser: ", currentUser);
        }


        let content = (
            <div>
                <Grid>
                    <Row>
                        <Col xs={12} md={8}>
                            {React.cloneElement(children, { user: currentUser })}
                        </Col>
                    </Row>
                </Grid>
            </div>
        );

        return (
            <div>
            <Header accounts={user.accounts}></Header>
            {content}
            </div>
        );
    }
};

function mapStateToProps(state) {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(AppContainer);