import React from 'react';
import { connect } from 'react-redux';
import NowTimeForm from './NowTimeForm'
import { loginTest, putLast, putToday } from '../../actions/userTest';

class NowTimePage extends React.Component {
  render() {
    return (
      <NowTimeForm stateUser={this.props.stateUser} onLogin={this.props.onLogin} onLogout={this.props.onLogout} onPutLast={this.props.onPutLast} onPutToday={this.props.onPutToday}/>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    stateUser: state.userTest
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLogin: (id) => {
      dispatch(loginTest(id))
    },
    onPutLast: (id, lastTime, logOut) => {
      dispatch(putLast(id, lastTime, logOut))
    },
    onPutToday: (id, todayTime, nowTime) => { 
      dispatch(putToday(id, todayTime, nowTime))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NowTimePage)
