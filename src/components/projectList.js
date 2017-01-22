import React, { Component } from 'react';
import {Table} from 'react-bootstrap';

class ProjectList extends Component {

    render() {
        console.log(this.props);
        return (
            <Table responsive>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Goal</th>
                        <th>Creator</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.items.map(item => 
                        <tr className={"projectRow"} key={item.address}>
                            <td>{item.title}</td>
                            <td>{item.goal}</td>
                            <td>{item.creator}</td>
                        </tr>
                    )}
                </tbody>
            </Table>
        )
    }
}

ProjectList.PropTypes = {
    items: React.PropTypes.array.isRequired
}

export default ProjectList;