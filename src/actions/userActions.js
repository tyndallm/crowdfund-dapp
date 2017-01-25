import * as Web3Api from '../api/web3api.js';

export const REQUEST_ACCOUNTS = "REQUEST_ACCOUNTS";
export const RECEIVE_ACCOUNTS = "RECEIVE_ACCOUNTS";
export const REQUEST_BLOCK_NUMBER = "REQUEST_BLOCK_NUMBER";
export const RECEIVE_BLOCK_NUMBER = "RECEIVE_BLOCK_NUMBER";

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
      .then(blockNum => dispatch(receiveBlockNumber(blockNum)))
  }
}