import * as Web3Api from '../api/web3api.js';

export const REQUEST_PROJECT = "REQUEST_PROJECT";
export const RECEIVE_PROJECT = "RECEIVE_PROJECT";
export const REQUEST_CONTRIBUTIONS = "REQUEST_CONTRIBUTIONS";
export const RECEIVE_CONTRIBUTIONS = "RECEIVE_CONTRIBUTIONS";

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

export function fetchProject(address) {
    return dispatch => {
        dispatch(requestProject)
        return Web3Api.getProjectDetails(address)
            .then(project => dispatch(receiveProject(project)));
    }
}

export function fetchContributions(contributions) {
    return dispatch => {
        dispatch(requestContributions(projectAddress))
        return Web3Api.getCurrentBlockNumber()
            .then(blockNum => dispatch(receiveBlockNumber(blockNum)));
    }
}