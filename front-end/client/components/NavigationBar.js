import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { logout } from '../actions/authActions';

class NavigationBar extends React.Component {
  logout(e){
    e.prevenDefault();
    this.props.logout();
  }

  render() {
    const { isAuthenticated } = this.props.auth;

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

NavigationBar.propTypes = {
  auth: React.PropTypes.object.isRequired,
  logout: React.PropTypes.object.isRequired
}

function mapStateToProps(state){
  return{
    auth: state.auth
  };
}

export default connect(mapStateToProps, { logout })(NavigationBar);