import reducer from './user'
import * as types from '../actions/types'

describe('auth reducer', () =>{
  it('should return intial state', () =>{
    expect(reducer(undefined, {})).toEqual(
      {
        "isAuthenticated": false,
        "setting": {"alert_interval": "", "alert_start_time": "", "id": "", "username": ""}, "user": {"id": "", "last_record_time": "", "now_start_time": "", "setting_id": "", "timeline_id": "", "today_spent_time": "", "username": ""}
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
