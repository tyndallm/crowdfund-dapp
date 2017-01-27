import React, { Component } from 'react';
import {Table} from 'react-bootstrap';
import {getEtherscanLink} from '../utils/utils';
import {fromWei} from '../api/web3Api';

class ProjectList extends Component {

    render() {
        return (
            <Table responsive>
                <thead>
                    <tr>
                        <th>Project</th>
                        <th>Funding goal</th>
                        <th>Progress</th>
                        <th>Blocks until deadline</th>
                        <th>Creator</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.items.map(item => 
                        <tr className={"projectRow"} key={item.address}>
                            <td><a href={"/project/" + item.address}>{item.title}</a></td>
                            <td>{fromWei(item.goal)}</td>
                            <td>{item.totalFunding / item.goal}%</td>
                            <td>{item.deadline - this.props.currentBlock}</td>
                            <td><a href={getEtherscanLink(item.creator)}>{item.creator}</a></td>
                        </tr>
                    )}
                </tbody>
            </Table>
        )
    }
}

ProjectList.PropTypes = {
    items: React.PropTypes.array.isRequired,
    currentBlock: React.PropTypes.number.isRequired
}

export default ProjectList;