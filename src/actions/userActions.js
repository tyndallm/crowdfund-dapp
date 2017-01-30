import * as Web3Api from '../api/web3api.js';

export const REQUEST_ACCOUNTS = "REQUEST_ACCOUNTS";
export const RECEIVE_ACCOUNTS = "RECEIVE_ACCOUNTS";
export const REQUEST_BLOCK_NUMBER = "REQUEST_BLOCK_NUMBER";
export const RECEIVE_BLOCK_NUMBER = "RECEIVE_BLOCK_NUMBER";
export const REQUEST_NETWORK = "REQUEST_NETWORK";
export const RECEIVE_NETWORK = "RECEIVE_NETWORK";
export const SELECT_ACCOUNT = "SELECT_ACCOUNT";
export const REQUEST_CONTRACT_BALANCE = "REQUEST_CONTRACT_BALANCE";
export const RECEIVE_CONTRACT_BALANCE = "RECEIVE_CONTRACT_BALANCE";

export function requestAccounts() {
    return {
        type: REQUEST_ACCOUNTS
    }
}

export function receiveAccounts(accounts) {
    return {
        type: RECEIVE_ACCOUNTS,
        accounts: accounts
    }
}

export function requestBlockNumber() {
    return {
        type: REQUEST_BLOCK_NUMBER
    }
}

export function receiveBlockNumber(blockNum) {
  return {
    type: RECEIVE_BLOCK_NUMBER,
    currentBlock: blockNum
  }
}

export function requestNetwork() {
    return {
        type: REQUEST_NETWORK
    }
}

export function receiveNetwork(network) {
    return {
        type: RECEIVE_NETWORK,
        network: network
    }
}

export function selectAccount(index) {
    return {
        type: SELECT_ACCOUNT,
        index: index
    }
}

export function fetchAccountsAndBalances() {
    return dispatch => {
        dispatch(requestAccounts)
        return Web3Api.getAccounts()
            .then(accounts => dispatch(receiveAccounts(accounts)));
    }
} 

export function fetchCurrentBlockNumber() {
    return dispatch => {
        dispatch(requestBlockNumber)
        return Web3Api.getCurrentBlockNumber()
            .then(blockNum => dispatch(receiveBlockNumber(blockNum)));
    }
}

export function fetchNetwork() {
    return dispatch => {
        dispatch(requestNetwork)
        return Web3Api.getNetwork()
            .then(network => dispatch(receiveNetwork(network)));
    }
}