import React from 'react';
import { shallow, mount } from 'enzyme';
import LoginForm from './LoginForm';

describe('Login Form', () => {
  let component = null;
  const testEmptyUser = {
    username: '',
    password: ''
  };
  const testStateUser = {
    username: 'testUsername',
    password: 'testTST'
  };

  const propsEmpty = {
    stateUser: testEmptyUser,
  }

  it('should render', () => {
    expect(LoginForm).not.toEqual(null);
  });
});
