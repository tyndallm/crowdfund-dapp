import * as Web3Api from '../api/web3Api';
import {createAction} from 'redux-actions';

export const fetchNetworkRequest = "@@network/FETCH_NETWORK_REQUEST";
export const fetchNetworkSuccess = "@@network/FETCH_NETWORK_SUCCESS";
export const fetchNetworkFailure = "@@network/FETCH_NETWORK_FAILURE";

export const fetchBlockNumberRequest = "@@network/FETCH_BLOCK_NUMBER_REQUEST";
export const fetchBlockNumberSuccess = "@@network/FETCH_BLOCK_NUMBER_SUCCESS";
export const fetchBlockNumberFailure = "@@network/FETCH_BLOCK_NUMBER_FAILURE";

export function fetchNetwork() {
    return {
        types: [
            fetchNetworkRequest,
            fetchNetworkSuccess,
            fetchNetworkFailure,
        ],
        callApi: () => Web3Api.getNetwork(),
        payload: {}
    };
}

export function fetchBlockNumber() {
    return {
        types: [
            fetchBlockNumberRequest,
            fetchBlockNumberSuccess,
            fetchBlockNumberFailure,
        ],
        callApi: () => Web3Api.getCurrentBlockNumber(),
        payload: {}
    };
}
