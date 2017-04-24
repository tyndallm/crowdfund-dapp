import {handleActions} from 'redux-actions';

import {
    fetchNetworkRequest,
    fetchNetworkSuccess,
    fetchNetworkFailure,
    fetchBlockNumberRequest,
    fetchBlockNumberSuccess,
    fetchBlockNumberFailure,
} from '../actions/networkActions';

import {
    requestReducer,
    fetchNetworkSuccessReducer,
    fetchBlockNumberSuccessReducer,
    failureReducer,
} from './reducerUtil';

const initialState = {
    isFetching: false,
    network: "",
    currentBlock: 0,
}

export const networkReducer = handleActions({
    [fetchNetworkRequest]: requestReducer,
    [fetchNetworkSuccess]: fetchNetworkSuccessReducer,
    [fetchNetworkFailure]: failureReducer,
    [fetchBlockNumberRequest]: requestReducer,
    [fetchBlockNumberSuccess]: fetchBlockNumberSuccessReducer,
    [fetchBlockNumberFailure]: failureReducer,
}, initialState);