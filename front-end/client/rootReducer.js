import { combineReducers } from 'redux';

import flashMessages from './reducers/flashMessages';
import auth from './reducers/auth';
import userTest from './reducers/userTest';

export default combineReducers({
  flashMessages,
  auth,
  userTest
});
