import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';

class ContributionList extends Component {
    render() {
        const { contributions } = this.props;
        return (
            <Table celled padded>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Address</Table.HeaderCell>
                        <Table.HeaderCell>Amount</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {contributions.map((contribution, index) => (
                        <Table.Row key={index}>
                            <Table.Cell>
                                {contribution.contributor}
                            </Table.Cell>
                            <Table.Cell>
                                {contribution.amount} ETH
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
        );
    }
}

ContributionList.PropTypes = {
    contributions: React.PropTypes.array.isRequired,
}

export default ContributionList;