import {createAction} from "redux-actions";

export function apiMiddleware({ dispatch, getState }) {
    return next => action => {
        const {
            types,
            callApi,
            shouldCallApi = (_state) => true,
            payload = {}
        } = action;

        if (!types) {
            // Normal action: pass it on
            return next(action);
        }

        if (
            !Array.isArray(types) ||
            types.length !== 3 || !types.every(type => typeof type === "string")
        ) {
            throw new Error("Expected an array of three string types.");
        }

        if (typeof callApi !== "function") {
            throw new Error("Expected fetch to be a function.");
        }

        if (!shouldCallApi(getState())) {
            return;
        }

        const [ requestType, successType, failureType ] = types;

        dispatch(createAction(requestType)(payload));

        return callApi().then(
            response => dispatch(createAction(successType)(response))
        ).catch(error => {
            dispatch(createAction(failureType)(error));
        });
    };
}