import React from 'react';
import { mount, shallow } from 'enzyme';
import NowTimeForm from './NowTimeForm';

describe('NowTimeForm', () => {
  let component = null;
  const mockOnLogin = jest.fn();
  const mockOnPutLast = jest.fn();
  const mockOnPutToday = jest.fn();
  const testEmptyUser = {
    id: '',
    username: '',
    today_spent_time: '',
    last_record_time: '',
    now_spent_time: ''
  };
  const testStateUser = {
    id: 'testId',
    username: 'testUsername',
    today_spent_time: 'testTST',
    last_record_time: 'testLRT',
    now_spent_time: 'testNST'
  };

  const propsEmpty = {
    stateUser: testEmptyUser,
    onLogin: mockOnLogin,
    onPutLast: mockOnPutLast,
    onPutToday: mockOnPutToday
  }

  const propsUser = {
    stateUser: testStateUser,
    onLogin: mockOnLogin,
    onPutLast: mockOnPutLast,
    onPutToday: mockOnPutToday
  }


  it('should render', () => {
    component = mount( <NowTimeForm {...propsEmpty}/>);
    expect(component).not.toEqual(null);
  });

  it('call login function', () => {
    const text = component.find('input');
    const button = component.find('button');
    text.simulate('change', {target: { value: 'asdf' } } );
    button.simulate('click');
    expect(mockOnLogin.mock.calls.length).toBe(1);
  });

  it('call logout function', () => {
    component = mount( < NowTimeForm {...propsUser}/>);
    const button = component.find('button');
    button.simulate('click');
    expect(mockOnPutLast.mock.calls.length).toBe(1);
  });
});


