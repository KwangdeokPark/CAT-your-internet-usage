import axios from 'axios';

import setAuthorizationToken from '../utils/setAuthorizationToken';
import jwt from 'jsonwebtoken';
import { SET_CURRENT_USER } from './types';

const signinUrl = 'http://127.0.0.1:8000/sign_in/'
const userUrl = 'http://127.0.0.1:8000/users/'

export function setCurrentUser(user){
  return {
    type: SET_CURRENT_USER,
    user: user
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
