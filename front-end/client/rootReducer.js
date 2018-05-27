import { combineReducers } from 'redux';

import flashMessages from './reducers/flashMessages';
import auth from './reducers/user';

export default combineReducers({
  flashMessages,
  user
});
