import React, { Component } from 'react';
import { Item, Label, Loader, Progress } from 'semantic-ui-react';
import {getFormattedProgressPercentage, getProjectStatus} from '../utils/projectUtils';

class ProjectList extends Component {

    render() {
        const {projects, isLoading, currentBlock} = this.props;
        return (
            <div>
            <Loader active={isLoading} inline='centered' />
            <Item.Group link divided>
                {projects.map((project, index) => 
                    <Item key={index} onClick={() => this.props.onProjectClicked(project.address)}>
                        <Item.Content>
                            <Item.Header>
                                {project.title}
                            </Item.Header>
                            <Item.Meta>{project.totalFunding + " / " + project.goal + " ETH"}</Item.Meta>
                            <Item.Description>
                            </Item.Description>
                            <Progress percent={getFormattedProgressPercentage(project.totalFunding, project.goal)} size='tiny'>
                                {getFormattedProgressPercentage(project.totalFunding, project.goal) + "%"}
                            </Progress>
                            <Item.Extra>
                                <Label color={'green'}>{getProjectStatus(currentBlock, project.deadline, project.totalFunding, project.goal)}</Label>
                                <Label icon='file text outline' content={project.address} />
                                <Label icon='user' content={project.creator} />
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                )}
            </Item.Group>
            </div>
        )
    }
}

ProjectList.PropTypes = {
    currentBlock: React.PropTypes.number.isRequired,
    projects: React.PropTypes.array.isRequired,
    isLoading: React.PropTypes.bool.isRequired,
    onProjectClicked: React.PropTypes.func.isRequired,
}

export default ProjectList;