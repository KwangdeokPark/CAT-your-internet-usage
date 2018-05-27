import React from 'react';
import SettingsForm from './SettingsForm';

class SettingsPage extends React.Component {
  render() {
    return (
      <div className="row">
        <div className="col-md-4 col-md-offset-4">
          <SettingsForm />
        </div>
      </div>
    );
  }
}

export default SettingsPage;

/*
import React from 'react';
import { connect } from 'react-redux';
import SettingsForm from './SettingsForm';
import { loginTest, putSetting } from '../../actions/userTest';

class NowTimePage extends React.Component {
  render() {
    return (
      <NowTimeForm stateUser={this.props.stateUser} onLogin={this.props.onLogin} onPutLast={this.props.onPutLast} onPutToday={this.props.onPutToday}/>
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
*/
