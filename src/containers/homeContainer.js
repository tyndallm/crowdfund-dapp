import React from 'react';
import {connect} from 'react-redux';
import { Container, Header } from 'semantic-ui-react';

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
                <Header as='h1'>Explore projects</Header>
                <p>Crowdfund hub is a decentralized crowdfunding platform built on Ethereum. This site is intended to demonstrate a full featured dapp using the latest Ethereum and web development frameworks including Webpack, React, Redux, Semantic-ui, Solidity, Web3, and Truffle. Feel free to create projects and interact with it. All source code is available <a href="https://github.com/tyndallm/crowdfund-dapp">here</a> and is based off truffle-box</p>
            </Container>
        )
    }
}

export default connect()(HomeContainer);