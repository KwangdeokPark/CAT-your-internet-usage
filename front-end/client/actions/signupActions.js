import axios from 'axios';

export function userSignupRequest(userData){
  return dispatch => {
    return axios.post('http://127.0.0.1:8000/sign_up/', userData);
    //.catch(exc=>console.log(exc));
  }
}
