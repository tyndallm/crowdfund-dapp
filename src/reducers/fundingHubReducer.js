import {
    REQUEST_PROJECTS,
    RECEIVE_PROJECTS,
    CREATE_PROJECT_SENT,
    CREATE_PROJECT_SUCCESSFUL,
    SHOW_CREATE_PROJECT_MODAL,
    HIDE_CREATE_PROJECT_MODAL,
    REQUEST_FUNDINGHUB_BALANCE,
    RECEIVE_FUNDINGHUB_BALANCE
} from '../actions/fundingHubActions';


const initialState = {
    isFetching: false,
    projects: [],
    showCreateModal: false,
    balance: 0
}

export default function fundingHubReducer(state = initialState, action) {
    switch (action.type) {
        case REQUEST_PROJECTS:
            return Object.assign({}, state, {
                isFetching: true
            });
        case RECEIVE_PROJECTS:
            return Object.assign({}, state, {
                isFetching: false,
                projects: action.projects,
            });
        case CREATE_PROJECT_SENT:
            return Object.assign({}, state, {
                isFetching: true
            });
        case CREATE_PROJECT_SUCCESSFUL:
            return Object.assign({}, state, {
                isFetching: false
            });
        case SHOW_CREATE_PROJECT_MODAL:
            return Object.assign({}, state, {
                showCreateModal: true
            });
        case HIDE_CREATE_PROJECT_MODAL:
            return Object.assign({}, state, {
                showCreateModal: false
            });
        case REQUEST_FUNDINGHUB_BALANCE:
            return Object.assign({}, state, {
                isFetching: true
            });
        case RECEIVE_FUNDINGHUB_BALANCE:
            return Object.assign({}, state, {
                isFetching: false,
                balance: action.balance,
            });
        default:
            return state;
    }
}