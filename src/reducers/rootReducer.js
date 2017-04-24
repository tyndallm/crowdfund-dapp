import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';

import {userReducer} from './userReducer';
import {networkReducer} from './networkReducer';

const rootReducer = combineReducers({
    user: userReducer,
    routing: routerReducer,
    network: networkReducer,
});

export default rootReducer;
