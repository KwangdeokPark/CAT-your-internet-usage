import axios from 'axios';
import {userSignupRequest} from './signupActions';

describe('userSignupRequest', () =>{
  it('user sign up request', () =>{

    axios.post = jest.fn(url => {
      return Promise.resolve();
    });
    const dispatch = jest.fn(),
      getState = jest.fn(()=>{
        url:'http:127.0.0.1:8000/sign_up';
      });

  })
})
