import validateInput from './signup';
import axios from 'axios';
import isEmpty from 'lodash/isEmpty';
import Validator from 'validator';

describe('SettingsEdit', () => {
  it('should do what I like', () => {
    const data = {username:'hello', password1:'hello', password2:'hello',
  age:'hello', alert_interval:'hello', alert_start_time:'hello'};
    const errors = {};
    const expectedAction = {
      errors:{},
      isValid: isEmpty(errors)
    }
    expect(validateInput(data)).toEqual(expectedAction)
  });
})
