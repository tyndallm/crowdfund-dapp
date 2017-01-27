import React from 'react';
import {connect} from 'react-redux';
import {Modal, Alert, Button, FormGroup, FormControl, ControlLabel, HelpBlock} from 'react-bootstrap';
// import {hideCreateProjectModal, createProject, fetchProjectsAndDetails} from "../actions/fundingHubActions";
import {getEtherscanLink} from "../utils/utils";
import {toWei} from '../api/web3Api';

class ContributeProjectDialog extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            amount: 0,
            contributor: ""
        }
    }

    render() {
        return (
            <div>
                Hello world
            </div>
        )
    }
}