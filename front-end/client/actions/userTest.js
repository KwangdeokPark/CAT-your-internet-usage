import axios from 'axios';

import { SET_CURRENT_USER_TEST } from './types';
import { LOGOUT_TEST } from './types';

const userTestUrl = 'http://127.0.0.1:8000/user_test/'

export function setCurrentUserTest(user_test){
  return {
    type: SET_CURRENT_USER_TEST,
    user_test: user_test
  };
}

export function logoutTest(){
  return {
    type: LOGOUT_TEST
  };
}

export function userTestLogin(id){

  let url = `${userTestUrl}${id}/`;

  return dispatch =>{
    return axios.get(url).then(res => {
      dispatch(setCurrentUserTest(res.data));
    });
  }
}
