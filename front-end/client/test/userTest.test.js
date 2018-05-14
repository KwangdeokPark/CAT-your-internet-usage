import userTest, { initialState } from '../reducers/userTest';
import * as userTestAction from '../actions/userTest';
import nock from 'nock';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';

describe('userTest', () => {
  describe('actions', () => {
    it('should create actions', () => {
      const expectedActions =[
        { type: 'SET_CURRENT_USER_TEST',
          user_test: 'user_test'
        },
        { type: 'LOGOUT_TEST' },
      ];
      const actions = [
        userTestAction.setCurrentUserTest('user_test'),
        userTestAction.logoutTest(),
      ];
      expect(actions).toEqual(expectedActions);
    });
  });
  describe('reducer', () => {
    let state = userTest(undefined, {});
    
    it('should initialize to initialState', () => {
      expect(state).toEqual(initialState);
    });
    
    it('should set current user', () => {
      const user_test = {
        id: 'testId',
        username: 'testUsername',
        today_spent_time: 'testTST',
        last_record_time: 'testLRT',
        now_start_time: 'testNST',
      };
      state = userTest(state, userTestAction.setCurrentUserTest(user_test));
      expect(state).toEqual(user_test);
    });

    it('should be initialState when logout', () => {
      state = userTest(state, userTestAction.logoutTest());
      expect(state).toEqual(initialState);
    });
  });
});
