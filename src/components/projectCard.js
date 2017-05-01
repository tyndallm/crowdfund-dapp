import React, { Component } from 'react';
import { Card, Button, Icon, Loader, Progress, Breadcrumb, Grid, Container } from 'semantic-ui-react';
import { getFormattedProgressPercentage } from '../utils/projectUtils';

import './projectCard.css';

var _this;

class ProjectCard extends Component {

    constructor(props) {
        super(props);
        _this = this;
    }

    handleContributeClicked =() => {
        this.props.onContributeClicked();
    }

    render() {
        const { project, isLoading } = _this.props;
        return(
            <Card fluid>
                <div className={'projectCard'}>
                    <Card.Content>
                        <Loader active={isLoading} inline />
                        <Card.Header as={'h1'}>
                            {project.title}
                        </Card.Header>
                        <Card.Description as={'h2'}>
                            {project.totalFunding + " / " + project.goal + " ETH"}
                        </Card.Description>
                        <Progress percent={getFormattedProgressPercentage(project.totalFunding, project.goal)} size='large' color='yellow'>
                            {getFormattedProgressPercentage(project.totalFunding, project.goal) + "%"}
                        </Progress>
                        <Button onClick={_this.handleContributeClicked} primary>Contribute</Button>
                    </Card.Content>
                </div>
            </Card>
        )
    }
}

ProjectCard.PropTypes = {
    project: React.PropTypes.object.isRequired,
    isLoading: React.PropTypes.bool.isRequired,
    onContributeClicked: React.PropTypes.func.isRequired,
}

export default ProjectCard;