import {createStore, applyMiddleware, compose} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {routerMiddleware} from 'react-router-redux';
import {apiMiddleware} from './middlewares/apiMiddleware';
import DevTools from '../containers/devTools';
import rootReducer from '../reducers/rootReducer';

// Redux DevTools
// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export function configureStore(history) {
    const routingMiddleware = routerMiddleware(history);

    const middlewares = applyMiddleware(
        thunkMiddleware,
        routingMiddleware,
        apiMiddleware
    );

    const enhancer = compose(
        middlewares,
        DevTools.instrument()
    );

    const initialState = {};

    const store = createStore(rootReducer, initialState, enhancer);

    if (module["hot"]) {
        module["hot"].accept("../reducers/rootReducer", () => {
            return store.replaceReducer(rootReducer);
        });
    }

    return store;
}
