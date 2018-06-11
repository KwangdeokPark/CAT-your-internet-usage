import React from 'react';
import { shallow, mount } from 'enzyme';
import LoginForm from './LoginForm';
import configureMockStore from 'redux-mock-store';

describe('Login Form', () => {
  let component = null;
  const mockStore = configureMockStore();
  let store = mockStore({
      stateUser: {
        id: 'testId',
        username: 'testUsername',
        password: 'testPassword'
      },
    });


  it('should render', () => {
    component = mount(<LoginForm store={ store }/>);
    expect(component).not.toEqual(null);
  });
});
