import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';

import {userReducer} from './userReducer';
import {networkReducer} from './networkReducer';
import {fundingHubReducer} from './fundingHubReducer';
import {projectReducer} from './projectReducer';

const rootReducer = combineReducers({
    user: userReducer,
    routing: routerReducer,
    network: networkReducer,
    fundingHub: fundingHubReducer,
    project: projectReducer
});

export default rootReducer;
