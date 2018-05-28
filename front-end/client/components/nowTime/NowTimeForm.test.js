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

  it('should render', () => {
    component = mount( <NowTimeForm {...propsEmpty}/>);
    expect(component).not.toEqual(null);
  });
});
