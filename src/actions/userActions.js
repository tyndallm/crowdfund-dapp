import * as Web3Api from '../api/web3api.js';

export const REQUEST_ACCOUNTS = "REQUEST_ACCOUNTS";
export const RECEIVE_ACCOUNTS = "RECEIVE_ACCOUNTS";

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

export function fetchAccountsAndBalances() {
    return dispatch => {
        dispatch(requestAccounts)
        return Web3Api.getAccounts()
            .then(accounts => dispatch(receiveAccounts(accounts)));
    }
} 