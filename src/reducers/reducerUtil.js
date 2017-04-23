
export const requestReducer = (state, action) => {
    return Object.assign({}, state, {
        isFetching: true,
        fetchComplete: false,
    });
}

const createSuccessReducer = (property) => (state, action) => {
    return Object.assign({}, state, {
        isFetching: false,
        fetchComplete: true,
        [property]: action.payload
    });
}

export const failureReducer = (state, action) => {
    console.log("Error: ", action.payload);
    return Object.assign({}, state, {
        isFetching: false,
        fetchComplete: true,
        error: action.payload.message
    });
}

export const fetchAccountsSuccessReducer = createSuccessReducer("accounts");