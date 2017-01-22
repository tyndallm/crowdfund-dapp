import * as Web3Api from '../api/web3api.js';

export const REQUEST_PROJECTS = "REQUEST_PROJECTS";
export const RECEIVE_PROJECTS = "RECEIVE_PROJECTS";
export const CREATE_PROJECT_SENT = "CREATE_PROJECT_SENT";
export const CREATE_PROJECT_SUCCESS = "CREATE_PROJECT_SUCCESS";
export const CREATE_PROJECT_FAILURE = "CREATE_PROJECT_FAILURE";

export function requestProjects() {
    return {
        type: REQUEST_PROJECTS
    }
}

export function receiveProjects(projects) {
    return {
        type: RECEIVE_PROJECTS,
        projects: projects
    }
}

export function createProjectSent(creator) {
    return {
        type: CREATE_PROJECT_SENT,
        creator
    }
}

export function createProjectSuccess(receipt) {
    return {
        type: CREATE_PROJECT_SUCCESS,
        txReceipt: receipt
    }
}

export function fetchProjectsAndDetails() {
    return dispatch => {
        dispatch(requestProjects)
        return Web3Api.getProjects()
            .then(projects => dispatch(receiveProjects(projects)));
    }
} 

export function createProject(creator) {
    return dispatch => {
        dispatch(createProjectSent(creator))
        return Web3Api.createProject(creator)
            .then(txReceipt => dispatch(createProjectSuccess(txReceipt)))
            // .then(fetchProjectsAndDetails()); // TODO this isn't working
    }
}