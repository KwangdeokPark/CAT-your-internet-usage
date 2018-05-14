import axios from 'axios';

export function userSignupRequest(userData){
  return dispatch => {
    return axios.post('/api/sign_up/', userData).catch(exc=>console.log(exc));  }
}
