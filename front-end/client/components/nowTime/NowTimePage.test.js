import React from 'react';
import { shallow, mount } from 'enzyme';
import NowTimePage from './NowTimePage';
import configureMockStore from 'redux-mock-store';
import * as userTestAction from '../../actions/userTest'

describe('NowTimePage', () => {
  let component = null;
  const mockStore = configureMockStore();
  
  let store = mockStore({
      stateUser: {
        id: 'testId',
        username: 'testUsername',
        today_spent_time: 'testTST',
        last_record_time: 'testLRT',
        now_spent_time: 'testNST'
      },
      onLogin: 'testOnLogin',
      onPutLast: 'testOnPutLast',
      onPutToday: 'testOnPutToday'
    });
  
  it('should render', () => {
    component = mount(<NowTimePage store={ store }/>);
    expect(component).not.toEqual(null);
  });
});
