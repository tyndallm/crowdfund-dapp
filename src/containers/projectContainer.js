import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import {fetchProject} from '../actions/projectActions';
import {fetchCurrentBlockNumber} from '../actions/userActions';
import {Grid, Row, Col, Panel, ListGroup, ListGroupItem} from 'react-bootstrap';
import ContributionList from '../components/contributionList';

class ProjectContainer extends Component {

    componentDidMount() {
        const {dispatch, params} = this.props;
        dispatch(fetchProject(params.address));
        dispatch(fetchCurrentBlockNumber());
    }

    render() {
        const {project} = this.props;
        return (
            <div>
                <Grid>
                    <Row>
                        <Col xs={12} md={8}>
                            <Panel header="Contributions">
                                <ContributionList items={project.contributions}/>
                            </Panel>
                        </Col>
                        <Col xs={12} md={4}>
                            <Panel header="Project Stats" bsStyle="success">
                                {project.title}
                                <ListGroup fill>
                                    <ListGroupItem>Remaining blocks: {project.deadline - this.props.currentBlock}</ListGroupItem>
                                    <ListGroupItem>Raised: {project.totalFunding} Ether</ListGroupItem>
                                    <ListGroupItem>Contributors: {project.contributorCount}</ListGroupItem>
                                    <ListGroupItem>Contributions: {project.contributionsCount}</ListGroupItem>
                                    <ListGroupItem>&hellip;</ListGroupItem>
                                </ListGroup>
                                Some more panel content here.
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