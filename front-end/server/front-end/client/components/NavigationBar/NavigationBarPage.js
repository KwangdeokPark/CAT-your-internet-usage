import React from 'react';
import { connect } from 'react-redux';
import NavigationBarForm from './NavigationBarForm';
import { logout, putLast, putToday, putTimeline } from '../../actions/userActions';

class NavigationBarPage extends React.Component {
  render() {
    return (
      <NavigationBarForm stateUser={this.props.stateUser} onLogout={this.props.onLogout} onPutLast={this.props.onPutLast} onPutToday={this.props.onPutToday} onPutTimeline={this.props.onPutTimeline}/>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    stateUser: state.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLogout: () => {
      dispatch(logout())
    },
    onPutLast: (id, lastTime, logOut) => {
      dispatch(putLast(id, lastTime, logOut))
    },
    onPutToday: (id, todayTime, nowTime) => {
      dispatch(putToday(id, todayTime, nowTime))
    },
    onPutTimeline: (id, todayTime, day, newUser, nowTime)=> {
      dispatch(putTimeline(id, todayTime, day, newUser, nowTime))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavigationBarPage)
