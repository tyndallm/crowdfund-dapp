import { combineReducers } from 'redux';
import userReducer from './userReducer';
import fundingHubReducer from './fundingHubReducer';

const rootReducer = combineReducers({
  user: userReducer,
  fundingHub: fundingHubReducer
})

export default rootReducer