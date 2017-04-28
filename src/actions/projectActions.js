import * as Web3Api from '../api/web3Api';

export const fetchProjectRequest = "@@project/FETCH_PROJECT_REQUEST";
export const fetchProjectSuccess = "@@project/FETCH_PROJECT_SUCCESS";
export const fetchProjectFailure = "@@project/FETCH_PROJECT_FAILURE";
export const fetchProjectBalanceRequest = "@@project/FETCH_PROJECT_BALANCE_REQUEST";
export const fetchProjectBalanceSuccess = "@@project/FETCH_PROJECT_BALANCE_SUCCESS";
export const fetchProjectBalanceFailure = "@@project/FETCH_PROJECT_BALANCE_FAILURE";
export const contributeProjectRequest = "@@project/CONTRIBUTE_PROJECT_REQUEST";
export const contributeProjectSuccess = "@@project/CONTRIBUTE_PROJECT_SUCCESS";
export const contributeProjectFailure = "@@project/CONTRIBUTE_PROJECT_FAILURE";

export function fetchProject(contractAddress) {
    return {
        types: [
            fetchProjectRequest,
            fetchProjectSuccess,
            fetchProjectFailure,
        ],
        callApi: () => Web3Api.getProjectDetails(contractAddress),
        payload: {}
    };
};

export function contribute(contractAddress, amount, userAddress) {
    return {
        types: [
            contributeProjectRequest,
            contributeProjectSuccess,
            contributeProjectFailure,
        ],
        callApi: () => Web3Api.contribute(contractAddress, amount, userAddress),
        payload: {}
    };
}

export function fetchProjectBalance(contractAddress) {
    return {
        types: [
            fetchProjectBalanceRequest,
            fetchProjectBalanceSuccess,
            fetchProjectBalanceFailure,
        ],
        callApi: () => Web3Api.getAddressBalance(contractAddress),
        payload: {}
    };
};
