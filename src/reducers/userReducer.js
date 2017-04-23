import {handleActions} from 'redux-actions';

import {
    fetchAccountsRequest,
    fetchAccountsSuccess,
    fetchAccountsFailure,
    selectAccount,
} from '../actions/userActions';

import {
    requestReducer,
    fetchAccountsSuccessReducer,
    failureReducer,
} from './reducerUtil';

const initialState = {
    isFetching: false,
    accounts: [],
    coinbase: "",
    selectedAccount: 0,
}

const setSelectedAccount = (state, action) => {
    return Object.assign({}, state, {
        selectedAccount: action.payload,
    });
};

export const userReducer = handleActions({
    [fetchAccountsRequest]: requestReducer,
    [fetchAccountsSuccess]: fetchAccountsSuccessReducer,
    [fetchAccountsFailure]: failureReducer,
    [selectAccount]: setSelectedAccount
}, initialState);