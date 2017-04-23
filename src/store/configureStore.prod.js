import {createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {routerMiddleware} from 'react-router-redux';
import {apiMiddleware} from './middlewares/apiMiddleware';
import rootReducer from '../reducers/rootReducer';


export function configureStore(history) {
    const routingMiddleware = routerMiddleware(history);

    const middlewares = applyMiddleware(
        thunkMiddleware,
        routingMiddleware,
        apiMiddleware
    );

    const initialState = {};

    return createStore(rootReducer, initialState, middlewares);
}