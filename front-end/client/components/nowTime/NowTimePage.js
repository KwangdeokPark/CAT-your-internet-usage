import React from 'react';
import { connect } from 'react-redux';
import NowTimeForm from './NowTimeForm'
import { loginTest, logoutTest } from '../../actions/userTest';

class NowTimePage extends React.Component {
  render() {
    return (
      <NowTimeForm stateUser={this.props.stateUser} onLogin={this.props.onLogin} onLogout={this.props.onLogout} />
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
    onLogout: () => {
      dispatch(logoutTest())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NowTimePage)
