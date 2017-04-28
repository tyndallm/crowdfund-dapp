import React, { Component } from 'react';
import { getEtherscanLink } from '../utils/web3Utils';

import { Segment, Message, Header, Item } from 'semantic-ui-react';

class ProjectDetails extends Component {
    render() {
        const { project, currentBlock } = this.props;
        return (
            <div>
                <Message 
                    attached
                    content={'Project details'}/>
                <Segment attached>
                    <Header as={'h5'}>Contract address:</Header>
                    <a href={getEtherscanLink(project.address)}>{project.address}</a>
                </Segment>
                <Segment attached>
                    <Header as={'h5'}>Raised:</Header>
                    {project.totalFunding} ETH
                </Segment>
                <Segment attached>
                    <Header as={'h5'}>Remaining blocks:</Header>
                    {project.deadline - currentBlock}
                </Segment>
                <Segment attached>
                    <Header as={'h5'}>Contributors:</Header>
                    {project.contributorsCount}
                </Segment>
                <Segment attached>
                    <Item>
                        <Item.Extra>
                            <Header as={'h5'}>Contributions:</Header>
                        </Item.Extra>
                        <Item.Extra>
                            {project.contributionsCount}
                        </Item.Extra>
                    </Item>
                </Segment>
                <Segment attached>
                    <Header as={'h5'}>Creator:</Header>
                    <a href={getEtherscanLink(project.cretor)}>{project.creator}</a>
                </Segment>
                <Segment attached={'bottom'}>
                    Balance:
                </Segment>
            </div>
        )
    }
}

ProjectDetails.PropTypes = {
    project: React.PropTypes.object.isRequired,
    currentBlock: React.PropTypes.number.isRequired,
}

export default ProjectDetails;