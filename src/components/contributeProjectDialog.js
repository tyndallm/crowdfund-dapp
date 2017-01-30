import React from 'react';
import {connect} from 'react-redux';
import {Modal, Alert, Button, FormGroup, FormControl, ControlLabel, HelpBlock} from 'react-bootstrap';
import {hideContributeProjectModal, makeContribution, fetchContributions, fetchProject} from '../actions/projectActions';
import {fetchAccountsAndBalances} from '../actions/userActions';
import {getEtherscanLink} from "../utils/utils";
import {toWei} from '../api/web3Api';

class ContributeProjectDialog extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            amount: 0
        }
    }

    handleContributeToProject = (event) => {
        const {dispatch} = this.props;

        dispatch(makeContribution(
            this.props.projectAddress,
            toWei(this.state.amount), // convert Eth to Wei for contract
            this.props.userAddress))
        .then(() => {
            dispatch(fetchContributions(this.props.projectAddress));
            dispatch(fetchProject(this.props.projectAddress));
            dispatch(fetchAccountsAndBalances());
        });

        // close dialog
        dispatch(hideContributeProjectModal());

        // reset state
        this.state = {
            amount: 0
        };
    }

    handleUpdateAmount = (event) => {
        event.preventDefault();
        this.setState({
            amount: event.target.value
        });
    }

    render() {
        const {dispatch} = this.props;
        return (
            <div>
                <Modal show={this.props.isOpen} bsSize="large" aria-labelledby="contained-modal-title-lg">
                    <Modal.Header>
                        <Modal.Title id="contained-modal-title-lg">Make a contribution to this project</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form>
                            <FormGroup controlId="amountInput">
                                <ControlLabel>Enter an amount to contribute (in Ether)</ControlLabel>
                                <FormControl type="number" value={this.state.amount} onChange={this.handleUpdateAmount} placeholder={"Enter an amount to contribute"} />
                            </FormGroup>
                            <FormGroup controlId="contributorAddress">
                                <ControlLabel>The contributor address:</ControlLabel>
                                <FormControl.Static>
                                    <a href={getEtherscanLink(this.props.userAddress)}>{this.props.userAddress}</a>
                                </FormControl.Static>
                            </FormGroup>
                          </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Alert bsStyle="warning">
                            Contributing to this project will cost a maximum of {this.props.gasCost} gas
                        </Alert>
                        <Button onClick={() => dispatch(hideContributeProjectModal())}>Close</Button>
                        <Button className={"btn btn-primary"} onClick={this.handleContributeToProject}>Create</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}

ContributeProjectDialog.PropTypes = {
    projectAddress: React.PropTypes.string.isRequired,
    isOpen: React.PropTypes.bool.isRequired,
    userAddress: React.PropTypes.string.isRequired,
    gasCost: React.PropTypes.number.isRequired
}

export default connect()(ContributeProjectDialog);