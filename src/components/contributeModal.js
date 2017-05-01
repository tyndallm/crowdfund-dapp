import React, { Component } from 'react';
import { Modal, Form, Button } from 'semantic-ui-react';
import { toWei } from '../api/web3Api';

const initialState = {
    amountInEth: 0
}

class ContributeModal extends Component {

    constructor(props) {
        super(props);

        this.state = initialState;
    }

    handleChange = (e, { name, value }) => this.setState({ [name]: value })

    handleClose = () => {
        this.props.onCloseModal();
        this.setState(initialState);
    }

    handleContribute = () => {
        console.log(this.state.amountInEth);
        this.props.onHandleContribute(this.state.amountInEth);
        this.setState(initialState);
    }
    
    render() {
        const { isDisplayed } = this.props;
        return (
            <div>
                <Modal 
                    open={isDisplayed}
                    closeOnDocumentClick={true}
                    onClose={this.handleClose}>
                    <Modal.Header>Contribute to this project</Modal.Header>
                    <Modal.Content>
                        <Modal.Description>
                            <Form>
                                <Form.Input 
                                    label='Enter an amount in Ether to contribute'
                                    placeholder='ex. 5'
                                    name={'amountInEth'}
                                    onChange={this.handleChange}
                                    value={this.state.amountInEth}  />
                            </Form>
                        </Modal.Description>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button onClick={this.handleClose}>Cancel</Button>
                        <Button primary onClick={this.handleContribute}>Contribute</Button>
                    </Modal.Actions>
                </Modal>
            </div>
        )
    }
}

ContributeModal.PropTypes = {
    isDisplayed: React.PropTypes.bool.isRequired,
    gasCost: React.PropTypes.number.isRequired,
    onCloseModal: React.PropTypes.func.isRequired,
    onHandleContribute: React.PropTypes.func.isRequired,
}

export default ContributeModal;