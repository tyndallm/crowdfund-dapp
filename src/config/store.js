import {browserHistory} from 'react-router';
import {createStore, applyMiddleware, compose} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {routerMiddleware} from 'react-router-redux';
import {apiMiddleware} from './apiMiddleware';
import rootReducer from '../reducers/rootReducer';

// Redux DevTools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const routingMiddleware = routerMiddleware(browserHistory);

const createStoreWithMiddleware = composeEnhancers(
    applyMiddleware(thunkMiddleware, apiMiddleware, routingMiddleware)(createStore));

const store = createStoreWithMiddleware(rootReducer);

export default store;