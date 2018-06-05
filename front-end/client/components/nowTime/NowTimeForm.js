import React, { PropTypes } from 'react'
import GroupStats from '../stats/GroupStats'

class NowTimeForm extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      nowTime: new Date()
    }
  }

  timeString(dt) {
    let ht = Math.floor(dt/3600000);
    let mt = (Math.floor(dt/60000))%60;
    let st = (Math.floor(dt/1000))%60;
    return ht + "h " + mt + "m " + st + "s"
  }

  isLogin(prop) {
    if(prop.stateUser === undefined) return false;
    return prop.stateUser.isAuthenticated;
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState({nowTime: new Date()});
    }, 500);
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  render() {
    
    let dt=0;
    let tt=0;

    if (this.isLogin(this.props)) {
      dt = this.state.nowTime - (new Date(this.props.stateUser.user.now_start_time)) + 100;
      tt = Math.floor(this.props.stateUser.user.today_spent_time/1000)*1000;
    }

    return (
      <div>
        <div>
          { this.isLogin(this.props)
            ? (
                <div>
                  <h1>Hi, {this.props.stateUser.user.username}</h1><br/>
                  <h1>You now use {this.timeString(dt)}</h1><br/>
                  <h1>You today use {this.timeString(dt + tt)}</h1><br/>
                </div>
              )
            : (
                <div>
                  <h1>Login first</h1>
                </div>
              )
          }
        </div>
      </div>
    )
  }
}

export default NowTimeForm;
