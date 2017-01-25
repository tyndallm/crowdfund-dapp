import { combineReducers } from 'redux';
import userReducer from './userReducer';
import fundingHubReducer from './fundingHubReducer';
import projectReducer from './projectReducer';

const rootReducer = combineReducers({
  user: userReducer,
  fundingHub: fundingHubReducer,
  project: projectReducer
})

export default rootReducer