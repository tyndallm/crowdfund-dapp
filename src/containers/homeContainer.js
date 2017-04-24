import React from 'react';
import {connect} from 'react-redux';
import { Container, Header, Divider, Button } from 'semantic-ui-react';

import CreateProjectModal from '../components/createProjectModal';

var _this;

class HomeContainer extends React.Component {

    constructor(props) {
        super(props);
        _this = this;

        this.state = {
            showCreateProjectModal: false
        }
    }

    componentDidMount() {
        // console.log("homeContainer.componentDidMount()");
        // console.log(this.props);
    }

    handleShowCreateProjectModal() {
        _this.toggleModalDisplayed();
    }

    handleCreateProjectClicked() {
        _this.toggleModalDisplayed();
    }

    toggleModalDisplayed() {
        _this.setState({
            showCreateProjectModal: !_this.state.showCreateProjectModal
        });
    }

    render() {
        console.log(this.props);
        return (
            <Container>
                <Header as='h1'>Explore projects</Header>
                <p>Crowdfund hub is a decentralized crowdfunding platform built on Ethereum. This site is intended to demonstrate a full featured dapp using the latest Ethereum and web development frameworks including Webpack, React, Redux, Semantic-ui, Solidity, Web3, and Truffle. Feel free to create projects and interact with it. All source code is available <a href="https://github.com/tyndallm/crowdfund-dapp">here</a> and is based off truffle-box</p>
                <Button 
                    primary
                    onClick={this.handleCreateProjectClicked}>
                    Create a project
                </Button>
                <Divider/>
                <CreateProjectModal
                    isDisplayed={this.state.showCreateProjectModal}
                    gasCost={300000}
                    blockNumber={this.props.blockNumber}
                    onCloseModal={this.handleShowCreateProjectModal}/>
            </Container>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.user,
        network: state.network
    }
}

export default connect(mapStateToProps)(HomeContainer);