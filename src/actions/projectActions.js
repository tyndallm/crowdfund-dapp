import * as Web3Api from '../api/web3api.js';

export const REQUEST_PROJECT = "REQUEST_PROJECT";
export const RECEIVE_PROJECT = "RECEIVE_PROJECT";
export const REQUEST_CONTRIBUTIONS = "REQUEST_CONTRIBUTIONS";
export const RECEIVE_CONTRIBUTIONS = "RECEIVE_CONTRIBUTIONS";
export const SHOW_CONTRIBUTE_PROJECT_MODAL = "SHOW_CONTRIBUTE_PROJECT_MODAL";
export const HIDE_CONTRIBUTE_PROJECT_MODAL = "HIDE_CONTRIBUTE_PROJECT_MODAL";
export const CONTRIBUTION_SENT = "CONTRIBUTION_SENT";
export const CONTRIBUTION_SUCCESS = "CONTRIBUTION_SUCCESS";
export const CONTRIBUTION_FAILURE = "CONTRIBUTION_FAILURE";
export const REQUEST_PROJECT_BALANCE = "REQUEST_PROJECT_BALANCE";
export const RECEIVE_PROJECT_BALANCE = "RECEIEVE_PROJECT_BALANCE";

export function requestProject(address) {
    return {
        type: REQUEST_PROJECT
    }
}

export function receiveProject(project) {
    return {
        type: RECEIVE_PROJECT,
        project: project
    }
}

export function requestContributions(projectAddress) {
    return {
        type: REQUEST_CONTRIBUTIONS
    }
}

export function receiveContributions(contributions) {
    return {
        type: RECEIVE_CONTRIBUTIONS,
        contributions: contributions
    }
}

export function showContributeProjectModal() {
    return {
        type: SHOW_CONTRIBUTE_PROJECT_MODAL
    }
}

export function hideContributeProjectModal() {
    return {
        type: HIDE_CONTRIBUTE_PROJECT_MODAL
    }
}

export function contributionSent(projectAddress, amount, contributorAddress) {
    return {
        type: CONTRIBUTION_SENT
    }
}

export function contributionSuccess(receipt) {
    return {
        type: CONTRIBUTION_SUCCESS,
        txReceipt: receipt
    }
}

export function requestProjectBalance(contractAddr) {
    return {
        type: REQUEST_PROJECT_BALANCE
    }
}

export function receiveProjectBalance(balance) {
    return {
        type: RECEIVE_PROJECT_BALANCE,
        balance: balance
    }
}

export function fetchProject(address) {
    return dispatch => {
        dispatch(requestProject)
        return Web3Api.getProjectDetails(address)
            .then(project => dispatch(receiveProject(project)));
    }
}

export function fetchContributions(projectAddress) {
  console.log(projectAddress);
    return dispatch => {
        dispatch(requestContributions(projectAddress))
        return Web3Api.getProjectContributions(projectAddress)
            .then(contributions => dispatch(receiveContributions(contributions)));
    }
}

export function makeContribution(projectAddress, amount, contributorAddress) {
    return dispatch => {
        dispatch(contributionSent(projectAddress, amount, contributorAddress))
        return Web3Api.makeContribution(projectAddress, amount, contributorAddress)
            .then(txReceipt => dispatch(contributionSuccess(txReceipt)))
    }
}

export function fetchProjectBalance(contractAddr) {
    return dispatch => {
        dispatch(requestProjectBalance(contractAddr))
        return Web3Api.getAccountBalance(contractAddr)
            .then(balance => dispatch(receiveProjectBalance(balance)));
    }
}