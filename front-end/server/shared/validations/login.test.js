import validateInput from './login';
import axios from 'axios';
import isEmpty from 'lodash/isEmpty';
import Validator from 'validator';

describe('SettingsEdit', () => {
  it('should do what I like', () => {
    const data = {username:'hello', password:'hello'};
    const errors = {};
    const expectedAction = {
      errors:{},
      isValid: isEmpty(errors)
    }
    expect(validateInput(data)).toEqual(expectedAction)
  });
})
