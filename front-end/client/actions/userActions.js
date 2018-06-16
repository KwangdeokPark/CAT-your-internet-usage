import axios from 'axios';

//import setAuthorizationToken from '../utils/setAuthorizationToken';
//import jwt from 'jsonwebtoken';
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
    //localStorage.removeItem('jwtToken');
    localStorage.removeItem('id');
    localStorage.setItem('username','');
    //setAuthorizationToken(false);
    //dispatch(setCurrentUser({}));
    dispatch(logoutUser());

  }
}

export function setCurrentUserById(id) {
  let url = `${userUrl}${id}/`

  return dispatch => {
    return axios.get(url).then(res => {
      //localStorage.setItem('id', '');
      //localStorage.setItem('jwtToken', '');
      //localStorage.setItem('groupId', '');
      //localStorage.setItem('username', '');
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
      //const token = res.data.token;
      //localStorage.setItem('jwtToken', token);
      localStorage.setItem('id', res.data.user.id);
      //setAuthorizationToken(token);
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

export function putLast(id, todayTime, lastTime, nowTime, logOut){
  let url = `${userUrl}${id}/`;

  if(logOut) {
    return dispatch => {
      return axios.put(url, {
        today_spent_time: todayTime,
        last_record_time: lastTime,
        now_start_time: nowTime
      }).then(res => {
        dispatch(logout());
      });
    };
  }
  else {
    return dispatch => {
      return axios.put(url, {
        today_spent_time: todayTime,
        last_record_time: lastTime,
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

export function putTimelineData(id, data, newUserData) {
  let url = `${timelineUrl}${id}/`;

  console.log(data);

  return dispatch => {
    return axios.put(url, data).then(res => {
      dispatch(setCurrentUser(newUserData));
    });
  }
}

export function putTimeline(id, todayTime, day, newUser, nowTime){
  let url = `${timelineUrl}${id}/`;

  try {
    return dispatch => {
      return axios.get(url).then(res => {
        let data;
        data = res.data;
        if(day === 0) {
          data.sun_average = ((data.sun_average * data.sun_count) +todayTime)/(data.sun_count + 1);
          data.sun_count ++;
        }
        else if(day === 1) {
          data.mon_average = ((data.mon_average * data.mon_count) + todayTime)/(data.mon_count + 1);
          data.mon_count ++;
        }
        else if(day === 2) {
          data.tue_average = ((data.tue_average * data.tue_count) + todayTime)/(data.tue_count + 1);
          data.tue_count++;
        }
        else if(day === 3) {
          data.wed_average = ((data.wed_average * data.wed_count) + todayTime)/(data.wed_count + 1);
          data.wed_count++;
        }
        else if(day === 4) {
          data.thu_average = ((data.thu_average * data.thu_count) + todayTime)/(data.thu_count + 1);
          data.thu_count++;
        }
        else if(day === 5) {
          data.fri_average = ((data.fri_average * data.fri_count) + todayTime)/(data.fri_count + 1);
          data.fri_count++;
        }
        else {
          data.sat_average = ((data.sat_average * data.sat_count) + todayTime)/(data.sat_count + 1);
          data.sat_count++;
        }

        let newUserData = newUser;
        newUserData.today_spent_time = 0;
        newUserData.now_start_time = nowTime;

        dispatch(putTimelineData(id, data, newUserData));
      });
    }
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
