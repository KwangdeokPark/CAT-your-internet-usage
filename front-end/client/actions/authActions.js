import axios from 'axios';

export function login(data){
  return dispatch =>{
    return axios.post('http://127.0.0.1:8000/sign_in/',data).then(res => {
      const token = res.data.token;
      localStorage.setItem('jwtToken', token);
    });
  }
}
