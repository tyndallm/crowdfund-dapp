import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import {Jumbotron, Button} from 'react-bootstrap';
import ProjectList from '../components/ProjectList';
import {fetchProjectsAndDetails, createProject} from "../actions/fundingHubActions";

var _this;

class HomeContainer extends Component {

    constructor(props) {
        super(props);
        _this = this;
    }

    componentDidMount() {
        const {dispatch} = _this.props;
        dispatch(fetchProjectsAndDetails());
    }

    handleCreateProjectClicked() {
        console.log("Create project clicked");
        const {dispatch, user} = _this.props;
        console.log(_this.props);
        dispatch(createProject(user.address));
    }

    render() {
        const {fundingHub} = _this.props;

        let projects = [];

        if(fundingHub.projects > 0) {
            projects = fundingHub.projects;
        }

        return (
            <div>
                <Jumbotron>
                    <h1>Hello, Ethereum!</h1>
                    <p>This is a fully functional decentralized crowdfunding platform built on Ethereum. Below you will see a list of all active crowdfunds you can contribute to.</p>
                    <p><Button bsStyle="primary" onClick={_this.handleCreateProjectClicked}>Create a project</Button></p>
                </Jumbotron>
                <ProjectList projects={projects}/>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        fundingHub: state.fundingHub
    }
}

export default connect(mapStateToProps)(HomeContainer);