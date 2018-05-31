import axios from 'axios';

import setAuthorizationToken from '../utils/setAuthorizationToken';
import jwt from 'jsonwebtoken';
import { SET_CURRENT_USER, LOGOUT, NOTHING } from './types';
import { SET_CURRENT_USER_SETTING } from './types';

const signinUrl = 'http://127.0.0.1:8000/sign_in/'
const userUrl = 'http://127.0.0.1:8000/users/'
const settingUrl = 'http://127.0.0.1:8000/settings/'
const timelineUrl = 'http://127.0.0.1:8000/timeline/'

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

export function nothing(){
  return {
    type: NOTHING
  }
}

export function setCurrentUserSetting(setting){
  return {
    type: SET_CURRENT_USER_SETTING,
    setting: setting
  };
}

export function logout(){
  return dispatch => {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('id');
    localStorage.setItem('username','');
    setAuthorizationToken(false);
    //dispatch(setCurrentUser({}));
    dispatch(logoutUser());
  }
}

export function setCurrentUserById(id) {
  let url = `${userUrl}${id}/`
  
  return dispatch => {
    return axios.get(url).then(res => {
      let newUserData = {
        id: res.data.id,
        username: res.data.username,
        today_spent_time: res.data.today_spent_time,
        last_record_time: res.data.last_record_time,
        now_start_time: res.data.now_start_time
      }
      dispatch(setCurrentUser(newUserData));
    });
  }
}


export function login(data){
  let url = `${signinUrl}`;

  return dispatch =>{
    return axios.post(url,data).then(res=> {
      const token = res.data.token;
      localStorage.setItem('jwtToken', token);
      localStorage.setItem('id', res.data.user.id);
      setAuthorizationToken(token);
      let newUserData = {
        id: res.data.user.id,
        username: res.data.user.username,
        today_spent_time: res.data.user.today_spent_time,
        last_record_time: res.data.user.last_record_time,
        now_start_time: res.data.user.now_start_time
      }
      dispatch(setCurrentUser(newUserData));
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
        let newUserData = {
          id: res.data.id,
          username: res.data.username,
          today_spent_time: res.data.today_spent_time,
          last_record_time: res.data.last_record_time,
          now_start_time: res.data.now_start_time
        }
        dispatch(setCurrentUser(newUserData));
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
      let newUserData = {
        id: res.data.id,
        username: res.data.username,
        today_spent_time: res.data.today_spent_time,
        last_record_time: res.data.last_record_time,
        now_start_time: res.data.now_start_time
      }
      dispatch(setCurrentUser(newUserData));
    });
  }
}

export function putTimeline(id, todayTime, day, newUser, nowTime){
  let url = `${timelineUrl}${id}/`;
  let putData;

  try {
    const data = axios.get(url);
    if(day === 0) putData = {
      sun_average: data.sun_average + todayTime,
      sun_count: data.sun_count + 1
    };
    else if(day === 1) putData = {
      mon_average: data.mon_average + todayTime,
      mon_count: data.mon_count + 1
    };
    else if(day === 2) putData = {
      tue_average: data.tue_average + todayTime,
      tue_count: data.tue_count + 1
    };
    else if(day === 3) putData = {
      wed_average: data.wed_average + todayTime,
      wed_count: data.wed_count + 1
    };
    else if(day === 4) putData = {
      thu_average: data.thu_average + todayTime,
      thu_count: data.thu_count + 1
    };
    else if(day === 5) putData = {
      fri_average: data.fri_average + todayTime,
      fri_count: data.fri_count + 1
    };
    else if(day === 6) putData = {
      sat_average: data.sat_average + todayTime,
      sat_count: data.sat_count + 1
    };

    let newUserData = newUser;
    newUserData.today_spent_time = 0;
    newUserData.now_start_time = nowTime;

    return axios.put(url, putData).then(res => {
      dispatch(setCurrentUser(newUserData));
    });
  }
  catch(e)
  {
    console.log(e);
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
