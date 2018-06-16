import { SET_CURRENT_USER, LOGOUT, NOTHING } from '../actions/types';
import isEmpty from 'lodash/isEmpty';

export const initialState = {
  isAuthenticated: false,
  user: {
    id: '',
    username: '',
    today_spent_time: '',
    last_record_time: '',
    now_start_time: '',
  }
};

export default (state = initialState, action = {}) => {
  switch(action.type) {
    case SET_CURRENT_USER:
      return {
        isAuthenticated: !isEmpty(action.user),
        user: action.user
      };
    case LOGOUT:
      return initialState;

    case NOTHING:
      return state;

    default: return state;
  }
}
