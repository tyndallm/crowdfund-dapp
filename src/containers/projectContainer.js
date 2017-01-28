import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import {fetchProject, showContributeProjectModal, fetchContributions} from '../actions/projectActions';
import {fetchCurrentBlockNumber} from '../actions/userActions';
import {Grid, Row, Col, Jumbotron, Button, Panel, ListGroup, ListGroupItem, ProgressBar} from 'react-bootstrap';
import ContributionList from '../components/contributionList';
import ContributeProjectDialog from '../components/ContributeProjectDialog';
import {getEtherscanLink, getFormattedProgressPercentage} from '../utils/utils';
import {fromWei} from '../api/web3Api';

var _this;

class ProjectContainer extends Component {

    constructor(props) {
        super(props);
        _this = this;
    }

    componentDidMount() {
        const {dispatch, params} = this.props;
        dispatch(fetchProject(params.address));
        dispatch(fetchContributions(params.address));
        dispatch(fetchCurrentBlockNumber());
    }

    handleContributeBtnClicked() {
        const {dispatch} = _this.props;
        dispatch(showContributeProjectModal());
    }

    render() {
        const {project} = this.props;
        let progressPercentage = 0;

        if (project.fundingGoal > 0) {
            progressPercentage = getFormattedProgressPercentage(project.totalFunding, project.fundingGoal);
        }
        return (
            <Row>
                <Col xs={12} md={8}>
                    <Jumbotron>
                        <h3>{project.title}</h3>
                        <p>{fromWei(project.totalFunding)}/{fromWei(project.fundingGoal)} ETH</p>
                        <ProgressBar striped bsStyle="warning" now={progressPercentage} label={`${progressPercentage}%`} />
                        <p><Button bsStyle="primary" onClick={_this.handleContributeBtnClicked}>Contribute</Button></p>
                    </Jumbotron>
                    <Panel header="Contributions">
                        <ContributionList items={project.contributions}/>
                    </Panel>
                </Col>
                <Col xs={12} md={4}>
                    <Panel header="Project Stats" bsStyle="success">
                        <ListGroup fill>
                            <ListGroupItem>Address: <a href={getEtherscanLink(project.address)}>{project.address}</a></ListGroupItem>
                            <ListGroupItem>Raised: {fromWei(project.totalFunding)}/{fromWei(project.fundingGoal)} ETH</ListGroupItem>
                            <ListGroupItem>Remaining blocks: {project.deadline - this.props.currentBlock}</ListGroupItem>
                            <ListGroupItem>Contributors: {project.contributorsCount}</ListGroupItem>
                            <ListGroupItem>Contributions: {project.contributionsCount}</ListGroupItem>
                            <ListGroupItem>Creator: <a href={getEtherscanLink(project.creator)}>{project.creator}</a></ListGroupItem>
                            <ListGroupItem>Request refund <Button bsStyle="danger" disabled>Withdraw</Button></ListGroupItem>
                        </ListGroup>
                    </Panel>
                </Col>
                <ContributeProjectDialog
                    projectAddress={project.address}
                    isOpen={project.showContributeModal}
                    userAddress={this.props.user.address}
                    gasCost={200000}/>
            </Row>
                
        )
    }

}

function mapStateToProps(state) {
    return {
        project: state.project,
        currentBlock: state.user.currentBlock,
    }
}

export default connect(mapStateToProps)(ProjectContainer);