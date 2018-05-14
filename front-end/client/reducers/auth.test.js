
import reducer from './auth'
import * as types from '../actions/types'

describe('auth reducer', () =>{
  it('should return intial state', () =>{
    expect(reducer(undefined, {})).toEqual(
      {
        isAuthenticated:false,
        user: {}
      }
    )
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

})
