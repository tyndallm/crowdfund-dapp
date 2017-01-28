import {
    REQUEST_PROJECT,
    RECEIVE_PROJECT,
    REQUEST_CONTRIBUTIONS,
    RECEIVE_CONTRIBUTIONS,
    SHOW_CONTRIBUTE_PROJECT_MODAL,
    HIDE_CONTRIBUTE_PROJECT_MODAL,
    CONTRIBUTION_SENT,
    CONTRIBUTION_SUCCESS,
    CONTRIBUTION_FAILURE
} from '../actions/projectActions';


const initialState = {
    isFetching: false,
    address: "0x0",
    totalFunding: 0,
    contributionsCount: 0,
    contributorsCount: 0,
    fundingGoal: 0,
    deadline: 0,
    creator: "0x0",
    title: "",
    contributions: [],
    fundingHub: "0x0",
    showContributeModal: false
}

export default function projectReducer(state = initialState, action) {
    switch (action.type) {
        case REQUEST_PROJECT:
            return Object.assign({}, state, {
                isFetching: true
            });
        case RECEIVE_PROJECT:
            return Object.assign({}, state, {
                isFetching: false,
                address: action.project.address,
                totalFunding: action.project.totalFunding,
                contributionsCount: action.project.contributionsCount,
                contributorsCount: action.project.contributorsCount,
                fundingGoal: action.project.goal,
                deadline: action.project.deadline,
                creator: action.project.creator,
                title: action.project.title,
                fundingHub: action.project.fundingHub
            });
        case REQUEST_CONTRIBUTIONS:
            return Object.assign({}, state, {
                isFetching: true
            });
        case RECEIVE_CONTRIBUTIONS:
            return Object.assign({}, state, {
                isFetching: false,
                contributions: action.contributions
            });
        case SHOW_CONTRIBUTE_PROJECT_MODAL:
            return Object.assign({}, state, {
                showContributeModal: true
            });
        case HIDE_CONTRIBUTE_PROJECT_MODAL:
            return Object.assign({}, state, {
                showContributeModal: false
            });
        case CONTRIBUTION_SENT:
            return Object.assign({}, state, {
                isFetching: true
            });
        case CONTRIBUTION_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false
            });
        default:
            return state;
    }
}