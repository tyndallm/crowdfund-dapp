import {handleActions} from 'redux-actions';

import {
    fetchProjectRequest,
    fetchProjectSuccess,
    fetchProjectFailure,
    contributeProjectRequest,
    contributeProjectSuccess,
    contributeProjectFailure,
    // fetchProjectBalanceRequest,
    // fetchProjectBalanceSuccess,
    // fetchProjectBalanceFailure,
} from '../actions/projectActions';

import {
    requestReducer,
    fetchProjectSuccessReducer,
    failureReducer,
} from './reducerUtil';

const initialState = {
    isFetching: false,
    project: {
        title: "-",
        goal: 0,
        deadline: 0,
        creator: "-",
        totalFunding: 0,
        contributionCount: 0,
        contributorsCount: 0,
        fundingHub: "-",
        address: "-",
        balance: 0
    },
    contributionSuccessful: true
}

// function fetchProjectBalanceSuccessReducer(state, action) {
    // console.log("state: ", state);
    // return Object.assign({}, state, {
    //     isFetching: false,
    //     fetchComplete: true,
    //     project: {
    //         ...state.project,
    //         balance: action.payload
    //     }
    // });
//     return state;
// };

function contributeProjectSuccessReducer(state, action) {
    console.log("action: ", action);
    return Object.assign({}, state, {
        isFetching: false,
        fetchComplete: true,
        contributionSuccessful: true
    });
}

export const projectReducer = handleActions({
    [fetchProjectRequest]: requestReducer,
    [fetchProjectSuccess]: fetchProjectSuccessReducer,
    [fetchProjectFailure]: failureReducer,
    [contributeProjectRequest]: requestReducer,
    [contributeProjectSuccess]: contributeProjectSuccessReducer,
    [contributeProjectFailure]: failureReducer,
}, initialState);