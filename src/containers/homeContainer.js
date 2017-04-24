import React from 'react';
import {connect} from 'react-redux';
import { Container } from 'semantic-ui-react';

var _this;

class HomeContainer extends React.Component {

    constructor(props) {
        super(props);
        _this = this;
    }

    componentDidMount() {
        // console.log("homeContainer.componentDidMount()");
        // console.log(this.props);
    }

    render() {
        return (
            <Container>
                <p>Hello Ethereum</p>
            </Container>
        )
    }
}

export default connect()(HomeContainer);