import React, { Component } from 'react';
import {Table} from 'react-bootstrap';
import {getEtherscanLink} from '../utils/utils';
import {fromWei} from '../api/web3Api';

class ContributionList extends Component {

    

    render() {
        return (
            <Table responsive>
                <thead>
                    <tr>
                        <th>Address</th>
                        <th>Amount (ETH)</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.items.map((item, index) => 
                        <tr className={"projectRow"} key={index}>
                            <td><a href={getEtherscanLink(item.contributor)}>{item.contributor}</a></td>
                            <td>{fromWei(item.amount)}</td>
                        </tr>
                    )}
                </tbody>
            </Table>
        )
    }
}

ContributionList.PropTypes = {
    items: React.PropTypes.array.isRequired
}

export default ContributionList;