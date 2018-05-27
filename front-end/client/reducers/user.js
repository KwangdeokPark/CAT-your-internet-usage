import { SET_CURRENT_USER, SET_CURRENT_USER_SETTING, LOGOUT } from '../actions/types';
import isEmpty from 'lodash/isEmpty';

const initialState = {
  isAuthenticated: false,
  user: {
    id: '',
    username: '',
    today_spent_time: '',
    last_record_time: '',
    now_start_time: '',
    setting_id: '',
    timeline_id: '',
  },
  setting: {
    id: '',
    username:'',
    alert_start_time:'',
    alert_interval:''
  }
};

export default (state = initialState, action = {}) => {
  switch(action.type) {
    case SET_CURRENT_USER:
      return {
        isAuthenticated: !isEmpty(action.user),
        user: action.user
      }

    case SET_CURRENT_USER_SETTING:
      return {
        isAuthenticated: !isEmpty(action.setting),
        setting: action.setting
      }

    case LOGOUT:
      return initialState

    default: return state;
  }
}
