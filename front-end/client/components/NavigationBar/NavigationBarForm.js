import React from 'react';
import { Link } from 'react-router';

class NavigationBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      nowTime: new Date()
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
    let dt = nt - (new Date(prop.stateUser.last_record_time)) + 100;
    if(dt > 5000) {
      let spent = (new Date(prop.stateUser.last_record_time)) - (new Date(prop.stateUser.now_start_time));
      prop.onPutToday(prop.stateUser.id, spent + prop.stateUser.today_spent_time, nt.toISOString());
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
      this.setState({nowTime: new Date()});
    }, 500);
  } 
      
  componentWillUpdate(nextProps, nextState) {
    if((!(this.isLogin(this.props))) && (this.isLogin(nextProps))) {
      this.checkRecord(nextProps) 
    }
    else if(this.isLogin(nextProps))
    {
      let dayp = ((new Date(this.props.stateUser.user.last_record_day)).getDay());
      let dayn = ((new Date(nextProps.stateUser.user.last_record_day)).getDay());
      if(dayp != dayn) {
        this.props.onPutTimeline(this.props.stateUser.user.id, 
                                 this.props.stateUser.user.today_spent_time, 
                                 dayp, 
                                 nextprops.stateUser.user, 
                                 nextprops.stateUser.user.last_record_day);
      }
    }
  }
    
  componentWillUnmount() {
    clearInterval(this.interval)  
  }

  render() {

    const userLinks = (
      <ul className="nav navbar-nav navbar-right">
        <li><a href="#" onClick={this.logout.bind(this)}>Sign out</a></li>
      </ul>
    );

    const guestLinks =(
      <ul className="nav navbar-nav navbar-right">
        <li><Link to="/sign_up">Sign up</Link></li>
        <li><Link to="/sign_in">Sign in</Link></li>
      </ul>
    );

    return (
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <Link to="/" className="navbar-brand">CAT</Link>
          </div>

          <div className="collapse navbar-collapse">
            { isAuthenticated ?  userLinks : guestLinks }
          </div>
        </div>
      </nav>
    );
  }
}
