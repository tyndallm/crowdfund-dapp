import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import {Jumbotron, Button, Alert} from 'react-bootstrap';
import ProjectList from '../components/projectList';
import CreateProjectDialog from '../components/createProjectDialog';
import {fetchProjectsAndDetails, showCreateProjectModal, createProject} from "../actions/fundingHubActions";
import {fetchCurrentBlockNumber} from "../actions/userActions";

var _this;

class HomeContainer extends Component {

    constructor(props) {
        super(props);
        _this = this;
    }

    componentDidMount() {
        const {dispatch} = _this.props;
        dispatch(fetchProjectsAndDetails());
        dispatch(fetchCurrentBlockNumber());
    }

    handleProjectBtnClicked() {
        const {dispatch, user} = _this.props;
        dispatch(showCreateProjectModal());
    }

    render() {
        const {fundingHub} = _this.props;

        let projects = [];

        if(fundingHub.projects.length > 0) {
            projects = fundingHub.projects;
        }

        let currentBlockNum = this.props.currentBlock;

        return (
            <div>
                <Alert bsStyle="warning">
                    <strong>Holy guacamole!</strong> Best check yo self, you're not looking too good.
                </Alert>
                
                <Jumbotron>
                    <h1>Hello, Ethereum!</h1>
                    <p>This is a fully functional decentralized crowdfunding platform built on Ethereum. Below you will see a list of all active crowdfunding projects you can contribute to.</p>
                    <p><Button bsStyle="primary" onClick={_this.handleProjectBtnClicked}>Create a project</Button></p>
                </Jumbotron>
                <ProjectList items={projects} currentBlock={currentBlockNum}/>
                <CreateProjectDialog
                    isOpen={this.props.fundingHub.showCreateModal}
                    userAddress={this.props.user.address}
                    gasCost={300000}
                    currentBlock={currentBlockNum} />

            </div>
        )
    }
};

function mapStateToProps(state) {
    return {
        fundingHub: state.fundingHub,
        currentBlock: state.user.currentBlock
    }
}

export default connect(mapStateToProps)(HomeContainer);