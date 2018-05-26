import { combineReducers } from 'redux';

import flashMessages from './reducers/flashMessages';
import user from './reducers/user';

export default combineReducers({
  flashMessages,
  user
});
