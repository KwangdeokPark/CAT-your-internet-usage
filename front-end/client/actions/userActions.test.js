import * as actions from './userActions';
import * as types from './types';

describe('actions', () =>{
  it('should create an action to set current user', () =>{
    const user ='ggggg'
    const expectedAction = {
      type:types.SET_CURRENT_USER,
      user
    }
    expect(actions.setCurrentUser(user)).toEqual(expectedAction)
  })
})
