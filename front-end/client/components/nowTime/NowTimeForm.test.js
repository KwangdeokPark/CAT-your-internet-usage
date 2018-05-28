import React from 'react';
import { mount, shallow } from 'enzyme';
import NowTimeForm from './NowTimeForm';

describe('NowTimeForm', () => {
  let component = null;
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
  }

  const propsUser = {
    stateUser: testStateUser,
  }

  component = mount( <NowTimeForm {...propsEmpty}/>);

  it('should render', () => {
    expect(component).not.toEqual(null);
  });

  it('should run timestring correctly', () => {
    expect(component.instance().timeString(3723000)).toEqual("1h 2m 3s")
  });

  it('should run isLogin correctly when undefined', () =>{
    const prop = { stateUser: undefined }
    expect(component.instance().isLogin(prop)).toEqual(false)
  })

  it('should run isLogin correctly when not undefined', () =>{
    const prop = { stateUser: { isAuthenticated: true } }
    expect(component.instance().isLogin(prop)).toEqual(true)
  })
});
