import * as React from 'React';
import {connect} from 'react-redux';
import { fetchAccountsAndBalances } from '../actions/userActions';
import Header from '../components/header';
import {Grid, Col, Row} from 'react-bootstrap';

class AppContainer extends React.Component {

    componentDidMount() {
        const {dispatch} = this.props;
        dispatch(fetchAccountsAndBalances());
    }

    render() {
        const {children, user} = this.props;

        let currentUser = {};
        if (user.accounts.length > 0) {
            currentUser = user.accounts[user.selectedAccount];
        }


        let content = (
            <div>
                <Grid>
                    <Row>
                        <Col xs={12} md={12}>
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
        user: state.user
    }
}

export default connect(mapStateToProps)(AppContainer);