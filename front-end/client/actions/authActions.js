import axios from 'axios';

import setAuthorizationToken from '../utils/setAuthorizationToken';
import jwt from 'jsonwebtoken';
import { SET_CURRENT_USER } from './types';

export function setCurrentUser(user){
  return {
    type: SET_CURRENT_USER,
    user
  };
}

export function logout(){
  return dispatch => {
    localStorage.removeItem('jwtToken');
    setAuthorizationToken(false);
    dispatch(setCurrentUser({}));
  }
}

export function login(data){
  return dispatch =>{
<<<<<<< HEAD
    return axios.get('http://127.0.0.1:8000/sign_in/',data).then(res=> {
=======
    return axios.post('http://127.0.0.1:8000/sign_in/',data).then(res=> {
>>>>>>> db366162334b370e0c7b2ce192f28b81761ce2f6
      const token = res.data.token;
      localStorage.setItem('jwtToken', token);
      setAuthorizationToken(token);
      dispatch(setCurrentUser(jwt.decode(token)));
<<<<<<< HEAD

=======
>>>>>>> db366162334b370e0c7b2ce192f28b81761ce2f6
    });
  }
}
