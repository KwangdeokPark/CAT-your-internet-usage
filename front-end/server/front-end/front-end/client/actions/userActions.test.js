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

  it('should create an action to nothing', () =>{
    const expectedAction = {
      type: types.NOTHING
    }
    expect(actions.nothing()).toEqual(expectedAction)
  })

  it('should create an action to set current user setting', () =>{
    const setting = 'temp setting'
    const expectedAction = {
      type: types.SET_CURRENT_USER_SETTING,
      setting
    }
    expect(actions.setCurrentUserSetting(setting)).toEqual(expectedAction)
  })

  it('should run logout', () =>{
    expect(actions.logout()).not.toEqual(undefined)
  })

  it('should run set current user by id', () =>{
    let id = 'temp id'
    expect(actions.setCurrentUserById(id)).not.toEqual(undefined)
  })

  it('should run login', () =>{
    let data = 'temp data'
    expect(actions.login(data)).not.toEqual(undefined)
  })

  it('shou;d run put last', () =>{
    let id = 'temp id';
    let lastTime = 'temp lastTime';
    let logOut = 'temp logOut';
    expect(actions.putLast(id, lastTime, logOut)).not.toEqual(undefined)
  })

  it('should run put today', () =>{
    let id = 'temp id';
    let todayTime = 'temp todayTime';
    let nowTime = 'temp nowTime';
    expect(actions.putToday(id, todayTime, nowTime)).not.toEqual(undefined)
  })

  it('should run put timeline', () =>{
    let id = 'temp id';
    let todayTime = 'temp todayTime';
    let day = 'temp day';
    let newUser = {
      id: 'temp id',
      username: 'temp username',
      today_spent_time: 'temp today spent time',
      last_record_time: 'temp last record time',
      now_start_time: 'temp now start time'
    }
    let nowTime = 'temp nowTime';
    expect(actions.putTimeline(id, todayTime, day, newUser, nowTime)).not.toEqual(undefined)
  })

  it('should run put setting', () =>{
    let id = 'temp id';
    let alertStartTime = 'temp alert start time';
    let alertInterval = 'temp alert interval';
    expect(actions.putSetting(id, alertStartTime, alertInterval)).not.toEqual(undefined)
  })
})
