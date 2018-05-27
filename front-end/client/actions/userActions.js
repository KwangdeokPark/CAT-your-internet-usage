import axios from 'axios';

import setAuthorizationToken from '../utils/setAuthorizationToken';
import jwt from 'jsonwebtoken';
import { SET_CURRENT_USER } from './types';
import { SET_CURRENT_USER_SETTING } from './types';

const signinUrl = 'http://127.0.0.1:8000/sign_in/'
const userUrl = 'http://127.0.0.1:8000/users/'
const settingUrl = 'http://127.0.0.1:8000/settings/'

export function setCurrentUser(user){
  return {
    type: SET_CURRENT_USER,
    user: user
  };
}

export function setCurrentUserSetting(setting){
  return {
    type: SET_CURRENT_USER_SETTING,
    setting: setting
  };
}

export function logoutUser(){
  return {
    type: LOGOUT
  };
}

export function logout(){
  return dispatch => {
    localStorage.removeItem('jwtToken');
    setAuthorizationToken(false);
    dispatch(logoutUser());
  }
}

export function login(data){
  let url = `${signinUrl}`;

  return dispatch =>{
    return axios.post(url,data).then(res=> {
      const token = res.data.token;
      localStorage.setItem('jwtToken', token);
      setAuthorizationToken(token);
      dispatch(setCurrentUser(jwt.decode(token)));
    });
  }
}

export function putLast(id, lastTime, logOut){
  let url = `${userUrl}${id}/`;

  if(logOut) {
    return dispatch => {
      return axios.put(url, {last_record_time: lastTime}).then(res => {
        dispatch(logout());
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
  let url = `${userUrl}${id}/`;

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

export function putSetting(id, alertStartTime, alertInterval){
  let url = `${settingUrl}${id}/`;

  return dispatch => {
    return axios.put(url, {
      alert_start_time: alertStartTime,
      alert_interval: alertInterval
    }).then(res => {
      dispatch(setCurrentUserSetting(res.data));
    });
  }
}
