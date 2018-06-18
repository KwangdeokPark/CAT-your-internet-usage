import axios from 'axios';

export function userSignupRequest(userData){
  return dispatch => {
    return axios.post('http://13.125.151.229:8000/sign_up/', userData);//.catch(exc=>console.log(exc));  
  }
}
