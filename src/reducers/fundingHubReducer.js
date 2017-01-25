import {
    REQUEST_PROJECTS,
    RECEIVE_PROJECTS,
    CREATE_PROJECT_SENT,
    CREATE_PROJECT_SUCCESSFUL,
    SHOW_CREATE_PROJECT_MODAL,
    HIDE_CREATE_PROJECT_MODAL
} from '../actions/fundingHubActions';


const initialState = {
    isFetching: false,
    projects: [],
    showCreateModal: false
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
        default:
            return state;
    }
}