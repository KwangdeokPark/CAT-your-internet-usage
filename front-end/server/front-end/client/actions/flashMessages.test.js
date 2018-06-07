import * as actions from './flashMessages';
import * as types from './types';

describe('actions', () =>{
  it('should create an action to display flash message', () =>{
    const message ='successfully signed up'
    const expectedAction = {
      type:types.ADD_FLASH_MESSAGE,
      message
    }
    expect(actions.addFlashMessage(message)).toEqual(expectedAction)
  })
})
