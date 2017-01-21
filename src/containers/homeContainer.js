import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import { fetchAccountsAndBalances } from '../actions/userActions';

class HomeContainer extends Component {

    componentDidMount() {
        const { dispatch } = this.props;
        // dispatch(fetchAccountsAndBalances());
    }

    render() {
        console.log(this.props);

        let address;
        if (this.props.user) {
            address = this.props.user.address;
        }

        return (
            <div>
                <p>Hello Ethereum</p>
                <p>{address}</p>
            </div>
        )
    }
}

HomeContainer.propTypes = {
    user: PropTypes.Object,
};

export default HomeContainer;