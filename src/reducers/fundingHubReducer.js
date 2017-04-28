import {handleActions} from 'redux-actions';

import {
    fetchProjectsRequest,
    fetchProjectsSuccess,
    fetchProjectsFailure,
    createProjectTransaction,
    createProjectSuccess,
    createProjectFailure,
} from '../actions/fundingHubActions';

import {
    requestReducer,
    fetchProjectsSuccessReducer,
    failureReducer,
} from './reducerUtil';

const initialState = {
    isFetching: false,
    projects: [],
}

function fetchProjectsSuccessReducerFunction(state, action) {
    console.log("fetchProjectsSuccessReducerFunction", action);
    return Object.assign({}, state, {
        isFetching: false,
        fetchComplete: true,
        projects: action.payload
    });
}

const fetchProjectSuc = (state, action) => {
    console.log("fetchProjectsSuc", action);
    return Object.assign({}, state, {
        projects: action.payload,
    });
};

function fetchProjectsFailureReducer(state, action) {
    console.log("fetchProjectsFailureReducer: ", action);
    return state;
}

export const fundingHubReducer = handleActions({
    [fetchProjectsRequest]: requestReducer,
    [fetchProjectsSuccess]: fetchProjectsSuccessReducer,
    [fetchProjectsFailure]: fetchProjectsFailureReducer,
}, initialState);