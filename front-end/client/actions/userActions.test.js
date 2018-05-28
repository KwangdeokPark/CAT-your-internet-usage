import * as actions from './userActions';
import * as types from './types';

describe('actions', () =>{
  it('should create an action to set current user', () =>{
    const user ='temp user'
    const expectedAction = {
      type:types.SET_CURRENT_USER,
      user
    }
    expect(actions.setCurrentUser(user)).toEqual(expectedAction)
  })

  it('should create an action to logout user', () =>{
    const expectedAction = {
      type: types.LOGOUT
    }
    expect(actions.logoutUser()).toEqual(expectedAction)
  })
})
