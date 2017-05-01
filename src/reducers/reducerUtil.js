
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

// User
export const fetchAccountsSuccessReducer = createSuccessReducer("accounts");

// Network
export const fetchNetworkSuccessReducer = createSuccessReducer("network");
export const fetchBlockNumberSuccessReducer = createSuccessReducer("currentBlock");

// FundingHub
export const fetchProjectsSuccessReducer = createSuccessReducer("projects");

// Project
export const fetchProjectSuccessReducer = createSuccessReducer("project");
export const fetchContributionsSuccessReducer = createSuccessReducer("contributions");
