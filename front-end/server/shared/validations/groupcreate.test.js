import validateInput from './groupcreate';
import axios from 'axios';
import isEmpty from 'lodash/isEmpty';
import Validator from 'validator';

describe('SettingsEdit', () => {
  it('should do what I like', () => {
    const data = {name:'hello', description:'hello'};
    const errors = {};
    const expectedAction = {
      errors:{},
      isValid: isEmpty(errors)
    }
    expect(validateInput(data)).toEqual(expectedAction)
  });
})
