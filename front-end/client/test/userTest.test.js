import userTest from '../reducers/userTest';
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
});
