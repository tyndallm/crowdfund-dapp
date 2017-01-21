import React, { Component } from 'react';
import {Table} from 'react-bootstrap';

class ProjectList extends Component {
    render() {
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
                    {this.props.projects.map(item => {
                        <ProjectListItem key={item.id} item={item} onItemClick={this.props.onHandleProjectClicked} />
                    })}
                </tbody>
            </Table>
        )
    }
}

var ProjectListitem = React.createClass({
    render() {
        return (
            <tr className={"marketRow"} key={this.props.item.id} onClick={this._onClick}>
                <td>{this.props.item.title}</td>
                <td>{this.props.item.goal}</td>
                <td>{this.props.item.creator}</td>
            </tr>
        )
    },
    _onClick() {
        this.props.onItemClick(this.props.item.id);
    }
});

export default ProjectList;