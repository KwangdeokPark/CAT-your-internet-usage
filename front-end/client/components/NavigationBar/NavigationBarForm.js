import React, { PropTypes } from 'react';
import { Link } from 'react-router';

class NavigationBarForm extends React.Component {

  logout(e){
    e.preventDefault();
    this.props.onLogout();
  }

  isLogin(prop) {
    if(prop.stateUser === undefined) return false;
    return prop.stateUser.isAuthenticated;


  }

  checkRecord(prop) {
    let nt = new Date();
    let dt = nt - (new Date(prop.stateUser.user.last_record_time)) + 100;
    if(dt > 3000) {
      let spent = (new Date(prop.stateUser.user.last_record_time)) - (new Date(prop.stateUser.user.now_start_time));
      prop.onPutToday(prop.stateUser.user.id, spent + prop.stateUser.user.today_spent_time, nt.toISOString());
    }
  }

  componentDidMount() {
    if(this.isLogin(this.props)) {
      this.checkRecord(this.props);
    }
    this.interval = setInterval(() => {
      if(this.isLogin(this.props)) {
        this.props.onPutLast(this.props.stateUser.user.id, (new Date()).toISOString(), false);
      }
    }, 500);
  }

  componentWillUpdate(nextProps, nextState) {
    if((!(this.isLogin(this.props))) && (this.isLogin(nextProps))) {
      this.checkRecord(nextProps)
    }
    else if(this.isLogin(nextProps))
    {
      let dayp = ((new Date(this.props.stateUser.user.last_record_time)).getDay());
      let dayn = ((new Date(nextProps.stateUser.user.last_record_time)).getDay());
      if(dayp != dayn) {
        this.props.onPutTimeline(this.props.stateUser.user.id,
                                 this.props.stateUser.user.today_spent_time,
                                 dayp,
                                 nextProps.stateUser.user,
                                 nextProps.stateUser.user.last_record_day);
      }
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  render() {

    const userLinks = (
      <ul className="nav navbar-nav navbar-right">
        <li><Link to="/group">Group</Link></li>
        <li><Link to="/stats" >Statistics</Link></li>
        <li><Link to="/settings" >Settings</Link></li>
        <li><a href="#" onClick={this.logout.bind(this)}>Sign out</a></li>
      </ul>
    );

    const guestLinks =(
      <ul className="nav navbar-nav navbar-right">
        <li><Link to="/sign_up" >Sign up</Link></li>
        <li><Link to="/sign_in" >Sign in</Link></li>
      </ul>
    );

    const groupLinks = (
      <ul className="nav navbar-nav navbar-right">
        <li><Link to="/group/join" > Join group</Link></li>
        <li><Link to="/group/create" >Create new group</Link></li>
        <li><Link to="/main" >Back to main</Link></li>
      </ul>
    );

    const groupJoinLinks = (
      <ul className="nav navbar-nav navbar-right">
        <li><Link to="/group" >Back</Link></li>
      </ul>
    );

    const groupCreateLinks = (
      <ul className="nav navbar-nav navbar-right">
        <li><Link to="/group" >Back</Link></li>
      </ul>
    );

    const groupDetailLinks = (
      <ul className="nav navbar-nav navbar-right">
        <li><Link to="/group" >Back</Link></li>
      </ul>
    );

    return (
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <Link to="/" className="navbar-brand">CAT</Link>
          </div>

          <div className="collapse navbar-collapse">
            {
              window.location.href == 'http://localhost:3000/group' ?  groupLinks :
              window.location.href == 'http://localhost:3000/group/join' ?  groupJoinLinks :
              window.location.href == 'http://localhost:3000/group/create' ?  groupCreateLinks :
              window.location.href == 'http://localhost:3000/group/detail/' ?  groupDetailLinks :
              this.isLogin(this.props) ?  userLinks : guestLinks
            }
          </div>
        </div>
      </nav>
    );
  }
}

export default NavigationBarForm;
