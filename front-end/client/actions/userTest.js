import axios from 'axios';

import { SET_CURRENT_USER_TEST } from './types';
import { LOGOUT_TEST } from './types';

const userTestUrl = 'http://127.0.0.1:8000/user_test/'

export function setCurrentUserTest(user_test){
  return {
    type: SET_CURRENT_USER_TEST,
    user_test: user_test,
  };
}

export function putLast(id, lastTime, logOut){
  let url = `${userTestUrl}${id}/`;

  if(logOut) {
    return dispatch => {
      return axios.put(url, {last_record_time: lastTime}).then(res => {
        dispatch(logoutTest());
      });
    };
  }
  else {
    return dispatch => {
      return axios.put(url, {last_record_time: lastTime}).then(res => {
        dispatch(setCurrentUserTest(res.data));
      });
    };
  }
}

export function putToday(id, todayTime, nowTime){
  let url = `${userTestUrl}${id}/`;

  return dispatch => {
    return axios.put(url, {
      today_spent_time: todayTime,
      last_record_time: nowTime,
      now_start_time: nowTime
    }).then(res => {
      dispatch(setCurrentUserTest(res.data));
    });
  }
}
