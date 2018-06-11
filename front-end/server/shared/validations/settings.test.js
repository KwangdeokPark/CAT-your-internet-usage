import validateInput from './settings';
import axios from 'axios';
import isEmpty from 'lodash/isEmpty';
import Validator from 'validator';

describe('SettingsEdit', () => {
  it('should do what I like', () => {
    const data = {alert_start_time:'hello', alert_interval:'hello'};
    const errors = {};
    const expectedAction = {
      errors:{},
      isValid: isEmpty(errors)
    }
    expect(validateInput(data)).toEqual(expectedAction)
  });
})
