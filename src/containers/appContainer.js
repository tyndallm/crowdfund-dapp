import React from 'react';
import {connect} from 'react-redux';
import {fetchAccountsAndBalances} from '../actions/userActions';

class AppContainer extends React.Component {
    
    componentDidMount() {
        const {dispatch} = this.props;
        dispatch(fetchAccountsAndBalances);
    }

    render() {
        console.log(this.props);
        let content = (
            <div>
                {this.props.children}
            </div>
        );

        return (
            <div>
                {content}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.user
    };
}

export default connect(mapStateToProps)(AppContainer);