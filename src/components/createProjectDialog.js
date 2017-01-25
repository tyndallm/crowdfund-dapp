import React from 'react';
import {connect} from 'react-redux';
import {Modal, Alert, Button, FormGroup, FormControl, ControlLabel, HelpBlock} from 'react-bootstrap';
import {hideCreateProjectModal, createProject, fetchProjectsAndDetails} from "../actions/fundingHubActions";
import {getEtherscanLink} from "../utils/utils";

const ONE_DAY_BLOCKS = 5082;
const ONE_WEEK_BLOCKS = 38117;
const ONE_MONTH_BLOCKS = 157553

class CreateProjectDialog extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            title: "",
            goal: 0, // TODO should probably be BigNumber
            deadline: ONE_DAY_BLOCKS, // minimum length
        };

    }

    handleCreateProject = (event) => {
        const {dispatch} = this.props;
        dispatch(createProject(
            this.state.title, 
            this.state.goal, 
            this.props.userAddress, 
            this.state.deadline)).then(() => {
            dispatch(fetchProjectsAndDetails());
        });

        // close dialog
        dispatch(hideCreateProjectModal());

        // reset state
        this.state = {
            title: "",
            goal: 0,
            deadline: ONE_DAY_BLOCKS
        };
    }

    handleUpdateTitle = (event) => {
        event.preventDefault();
        this.setState({
            title: event.target.value
        });
    }

    handleUpdateGoal = (event) => {
        event.preventDefault();
        this.setState({
            goal: event.target.value
        });
    }

    handleUpdateDeadline = (event) => {
        event.preventDefault();
        let actualDeadline = Number(event.target.value) + this.props.currentBlock;
        console.log(actualDeadline);
        this.setState({
            deadline: actualDeadline
        });
    }

    render() {
        const {dispatch} = this.props;
        return (
            <div>
                <Modal show={this.props.isOpen} bsSize="large" aria-labelledby="contained-modal-title-lg">
                    <Modal.Header>
                        <Modal.Title id="contained-modal-title-lg">Create a new crowdfunding project</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form>
                            <FormGroup
                              controlId="titleInput">
                              <ControlLabel>Create a title for your project</ControlLabel>
                              <FormControl
                                type="text"
                                value={this.state.title}
                                placeholder="Enter Title"
                                onChange={this.handleUpdateTitle}
                              />
                            </FormGroup>
                            <FormGroup controlId="goalInput">
                                <ControlLabel>Enter a minimum funding goal for payout</ControlLabel>
                                <FormControl type="number" value={this.state.goal} onChange={this.handleUpdateGoal} placeholder={"Enter a goal in Wei"} />
                            </FormGroup>
                            <FormGroup controlId="creatorAddress">
                                <ControlLabel>Upon successful funding payout will be made to:</ControlLabel>
                                <FormControl.Static>
                                    <a href={getEtherscanLink(this.props.userAddress)}>{this.props.userAddress}</a>
                                </FormControl.Static>
                            </FormGroup>
                            <FormGroup controlId="deadlineSelect">
                                <ControlLabel>Select deadline (number of blocks from now)</ControlLabel>
                                <FormControl componentClass="select" onChange={this.handleUpdateDeadline} placeholder="select">
                                    <option value={ONE_DAY_BLOCKS}>~ 1 day (5082 blocks)</option>
                                    <option value={ONE_WEEK_BLOCKS}>~ 1 week (38,117 blocks)</option>
                                    <option value={ONE_MONTH_BLOCKS}>~ 1 month (157,553 blocks)</option>
                                </FormControl>
                            </FormGroup>
                          </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Alert bsStyle="warning">
                            Creating this project will cost a maximum of {this.props.gasCost} gas
                        </Alert>
                        <Button onClick={() => dispatch(hideCreateProjectModal())}>Close</Button>
                        <Button className={"btn btn-primary"} onClick={this.handleCreateProject}>Create</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
    
}

CreateProjectDialog.PropTypes = {
    isOpen: React.PropTypes.bool.isRequired,
    userAddress: React.PropTypes.string.isRequired,
    gasCost: React.PropTypes.number.isRequired,
    currentBlock: React.PropTypes.number.isRequired
}

export default connect()(CreateProjectDialog);