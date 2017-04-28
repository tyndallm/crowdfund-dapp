import * as Web3Api from '../api/web3Api';

export const fetchProjectsRequest = "@@fundingHub/FETCH_PROJECTS_REQUEST";
export const fetchProjectsSuccess = "@@fundingHub/FETCH_PROJECTS_SUCCESS";
export const fetchProjectsFailure = "@@fundingHub/FETCH_PROJECTS_FAILURE";
export const createProjectTransaction = "@@fundingHub/CREATE_PROJECT_TRANSACTION";
export const createProjectSuccess = "@@fundingHub/CREATE_PROJECT_SUCCESS";
export const createProjectFailure = "@@fundingHub/CREATE_PROJECT_FAILURE";

export function fetchProjects() {
    console.log("fundingHubActions.fetchProjects()");
    return {
        types: [
            fetchProjectsRequest,
            fetchProjectsSuccess,
            fetchProjectsFailure,
        ],
        callApi: () => Web3Api.getProjects(),
        payload: {}
    };
};

export function createProject(projectParams, creatorAddress) {
    console.log("fundingHubActions.createProject() projectParams: ", projectParams);
    return {
        types: [
            createProjectTransaction,
            createProjectSuccess,
            createProjectFailure,
        ],
        callApi: () => Web3Api.createProject(projectParams, creatorAddress),
        payload: {}
    };
};