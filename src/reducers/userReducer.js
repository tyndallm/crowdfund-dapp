import {
    REQUEST_ACCOUNTS,
    RECEIVE_ACCOUNTS
} from '../actions/userActions';


const initialState = {
    isFetching: false,
    accounts: [],
    coinbase: "",
    selectedAccount: 0
}

export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case REQUEST_ACCOUNTS:
            return Object.assign({}, state, {
                isFetching: true
            })
        case RECEIVE_ACCOUNTS:
            return Object.assign({}, state, {
                isFetching: false,
                accounts: action.accounts,
                coinbase: action.accounts[0]
            })
        default:
            return state;
    }
}