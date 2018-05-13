const initialState = {
  id: '',
  username: '',
  today_spent_time: '',
  last_record_time: '',
  now_start_time: '',
};

export default (state = initialState, action) => {
  switch(action.type) {
    case 'SET_CURRENT_USER_TEST':
      return {
        id: action.user_test.id,
        username: action.user_test.username,
        today_spent_time: action.user_test.today_spent_time,
        last_record_time: action.user_test.last_record_time,
        now_start_time: action.user_test.now_start_time,
      }
    
    case 'LOGOUT_TEST':
      return initialState

    default:
      return state;
  }
}
