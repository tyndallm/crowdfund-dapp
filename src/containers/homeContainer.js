import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Container, Header, Divider, Button } from 'semantic-ui-react';
import { push } from 'react-router-redux';

import CreateProjectModal from '../components/createProjectModal';
import ProjectList from '../components/projectList';
import {createProject, fetchProjects} from '../actions/fundingHubActions';


var _this;

class HomeContainer extends Component {

    constructor(props) {
        super(props);
        _this = this;

        this.state = {
            showCreateProjectModal: false
        }
    }

    componentDidMount() {
        const {dispatch} = _this.props;
        dispatch(fetchProjects());
    }

    toggleModalDisplayed() {
        _this.setState({
            showCreateProjectModal: !_this.state.showCreateProjectModal
        });
    }

    handleCreateProjectClicked() {
        _this.toggleModalDisplayed();
    }

    handleCreateProject(project) {
        const {dispatch, user} = _this.props;

        _this.toggleModalDisplayed();

        let selectedUserAddress = user.accounts[user.selectedAccount].address;

        if (!!selectedUserAddress) {
            dispatch(createProject(project, selectedUserAddress))
            .then(() => {
                dispatch(fetchProjects());
            });
        }
    }

    handleProjectClicked(projectAddress) {
        const { dispatch } = _this.props;
        dispatch(push(`/project/${projectAddress}`));
    }

    render() {
        console.log("homeContainer props: ", this.props);
        return (
            <Container>
                <Header as='h1'>Explore projects</Header>
                <p>Crowdfund Dapp is a decentralized crowdfunding platform built on Ethereum. This site is intended to demonstrate a full featured dapp using the latest Ethereum and web development frameworks including Webpack, React, Redux, Semantic-ui, Solidity, Web3, and Truffle. Feel free to create projects and interact with it. All source code is available <a href="https://github.com/tyndallm/crowdfund-dapp">here</a> and is based off truffle-box</p>
                <Button 
                    primary
                    onClick={this.handleCreateProjectClicked}>
                    Create a project
                </Button>
                <Divider/>
                <ProjectList 
                    projects={this.props.fundingHub.projects}
                    isLoading={this.props.fundingHub.isFetching}
                    blockNumber={this.props.network.currentBlock}
                    onProjectClicked={this.handleProjectClicked}/>
                <CreateProjectModal
                    isDisplayed={this.state.showCreateProjectModal}
                    gasCost={300000}
                    blockNumber={this.props.network.blockNumber}
                    onCloseModal={this.toggleModalDisplayed}
                    onHandleProjectCreate={this.handleCreateProject}/>
            </Container>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.user,
        network: state.network,
        fundingHub: state.fundingHub,
    }
}

export default connect(mapStateToProps)(HomeContainer);