import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import {fetchProject} from '../actions/projectActions';

class ProjectContainer extends Component {

    componentDidMount() {
        const {dispatch, params} = this.props;
        dispatch(fetchProject(params.address));
    }

    render() {
        const {project} = this.props;
        return (
            <div>
                <p>Title: {project.title}</p>
                <p>Total raised: {project.totalFunding}</p>
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