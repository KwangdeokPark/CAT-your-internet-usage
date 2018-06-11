import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import axios from 'axios';
import styled from "styled-components";


class NavigationBarForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      notTime: new Date(),
      alert_start_time: 0
    }
  }

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
      console.log("spent");
      console.log(spent);
      prop.onPutToday(prop.stateUser.user.id, spent + prop.stateUser.user.today_spent_time, nt.toISOString());
    }
  }

  componentWillMount() {
    const settingUrl = 'http://127.0.0.1:8000/setting/';
    const Id = localStorage.getItem('id');
    let url = `${settingUrl}${Id}/`;
    axios.get(url).then(res => this.setState({
      alert_start_time: res.data.alert_start_time
    }));
  }

  componentDidMount() {
    if(this.isLogin(this.props)) {
      this.checkRecord(this.props);
    }
    this.interval = setInterval(() => {
      if(this.isLogin(this.props)) {
        this.setState({nowTime: new Date()});
        this.props.onPutLast(this.props.stateUser.user.id, this.props.stateUser.user.today_spent_time, (new Date()).toISOString(), (new Date(this.props.stateUser.user.now_start_time)).toISOString(), false);
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

        let spent = (new Date(this.props.stateUser.user.last_record_time)) - (new Date(this.props.stateUser.user.now_start_time));
        this.props.onPutTimeline(this.props.stateUser.user.id,
                                 spent + this.props.stateUser.user.today_spent_time,
                                 dayp % 7,
                                 nextProps.stateUser.user,
                                 nextProps.stateUser.user.last_record_time);

      }
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  colorString(col) {
    let hr = col.r.toString(16);
    let hg = col.g.toString(16);
    let hb = col.b.toString(16);
    return `#${hr}${hg}${hb}`;
  }

  ratColor(rat) {
    let trat;
    let s;
    let e;
    let col = {r: 247, g: 247, b: 246};

    const colList = [
      {r: 204, g: 243, b: 144},
      {r: 224, g: 224, b: 90},
      {r: 247, g: 196, b: 31},
      {r: 252, g: 147, b: 10},
      {r: 255, g: 0,   b: 61}
    ]

    let index = Math.floor(rat/0.25);
    if(index == 4)
    {
      index--;
      trat = 1;
    }
    else
    {
      trat = rat * 4;
      while(trat > 1) trat = trat - 1;
    }

    s = colList[index];
    e = colList[index + 1];

    col.r = Math.floor(trat*e.r + (1-trat)*s.r);
    col.g = Math.floor(trat*e.g + (1-trat)*s.g);
    col.b = Math.floor(trat*e.b + (1-trat)*s.b);

    return col;
  }

  render() {

    let bCol = {r: 247, g: 247, b: 247};

    if(this.isLogin(this.props)) {
      if(this.state.alert_start_time > 0)
      {
        let dt = this.state.nowTime - (new Date(this.props.stateUser.user.now_start_time)) + 100;
        let rat;
        if(!isNaN(dt)) {
          if(dt > this.state.alert_start_time) rat = 1;
          else rat = dt / this.state.alert_start_time;
          bCol = this.ratColor(rat);
        }
      }
    }

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
        <div style={{backgroundColor: this.colorString(bCol)}}className="container-fluid">
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
