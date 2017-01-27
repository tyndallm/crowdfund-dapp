import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import {fetchProject} from '../actions/projectActions';
import {fetchCurrentBlockNumber} from '../actions/userActions';
import {Grid, Row, Col, Jumbotron, Button, Panel, ListGroup, ListGroupItem, ProgressBar} from 'react-bootstrap';
import ContributionList from '../components/contributionList';
import {getEtherscanLink} from '../utils/utils';
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
        dispatch(fetchCurrentBlockNumber());
    }

    handleContributeBtnClicked() {
        console.log("contribute btn clicked");
    }

    render() {
        const {project} = this.props;
        let progress = Number(project.totalFunding) / Number(project.fundingGoal);
        return (
            <div>
                <Grid>
                    <Row>
                        <Col xs={12} md={8}>
                            <Jumbotron>
                                <h3>{project.title}</h3>
                                <p>An optional project description goes here</p>
                                <ProgressBar now={progress} label={`${progress}%`} />
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
                                    <ListGroupItem>Raised: {fromWei(project.totalFunding)}/{fromWei(project.fundingGoal)} Ether</ListGroupItem>
                                    <ListGroupItem>Remaining blocks: {project.deadline - this.props.currentBlock}</ListGroupItem>
                                    <ListGroupItem>Contributors: {project.contributorsCount}</ListGroupItem>
                                    <ListGroupItem>Contributions: {project.contributionsCount}</ListGroupItem>
                                    <ListGroupItem>Creator: <a href={getEtherscanLink(project.creator)}>{project.creator}</a></ListGroupItem>
                                    <ListGroupItem>&hellip;</ListGroupItem>
                                </ListGroup>
                            </Panel>
                        </Col>
                    </Row>
                </Grid>
                
            </div>
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