import reducer from './user'
import * as types from '../actions/types'
import { initialState } from './user' 

describe('user reducer', () =>{
  it('should return intial state', () =>{
    expect(reducer(undefined, {})).toEqual(initialState)
  })

  it('should handle SET_CURRENT_USER', () =>{
    expect(
      reducer([],{
        type: types.SET_CURRENT_USER,
        user:'temp user'
      })
    ).toEqual(
      {
        isAuthenticated: true,
        user:'temp user'
      }
    )
  })

  let tempState = {
    isAuthenticated: true,
    user: 'temp user'
  }
  it('should handle LOGOUT', () =>{
    expect(
      reducer(tempState, {
        type: types.LOGOUT
      })
    ).toEqual(initialState)
  })

  it('should handle NOTHING', () =>{
    expect(
      reducer(tempState, {
        type: types.NOTHING
      })
    ).toEqual(tempState)
  })
})
