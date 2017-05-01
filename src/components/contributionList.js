import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';
import { getEtherscanLink } from '../utils/web3Utils';

class ContributionList extends Component {
    render() {
        const { contributions, isLoading } = this.props;
        
        return (
            <Table celled padded >
                
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Contributor</Table.HeaderCell>
                        <Table.HeaderCell>Amount</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {contributions.map((contribution, index) => (
                        <Table.Row key={index}>
                            <Table.Cell>
                                <a href={getEtherscanLink(contribution.contributor)}>{contribution.contributor}</a>
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