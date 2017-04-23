import React from 'react';
import {connect} from 'react-redux';

var _this;

class HomeContainer extends React.Component {

    constructor(props) {
        super(props);
        _this = this;
    }

    componentDidMount() {
        console.log("homeContainer.componentDidMount()");
        console.log(this.props);
    }

    render() {
        return (
            <div>
                <p>Hello Ethereum</p>
            </div>
        )
    }
}

export default connect()(HomeContainer);