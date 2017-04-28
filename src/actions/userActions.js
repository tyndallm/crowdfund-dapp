import * as Web3Api from '../api/web3Api';
import {createAction} from 'redux-actions';

export const fetchAccountsRequest = "@@user/FETCH_ACCOUNTS_REQUEST";
export const fetchAccountsSuccess = "@@user/FETCH_ACCOUNTS_SUCCESS";
export const fetchAccountFailure = "@@user/FETCH_ACCOUNTS_FAILURE";
export const selectAccount = "@@user/SELECT_ACCOUNT";

export function fetchAccountsAndBalances() {
    return {
        types: [
            fetchAccountsRequest,
            fetchAccountsSuccess,
            fetchAccountFailure,
        ],
        callApi: () => Web3Api.getAccounts(),
        payload: {}
    };
}

export const setSelectedAccount = createAction(selectAccount);