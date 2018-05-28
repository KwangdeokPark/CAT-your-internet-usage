import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { logout } from '../actions/userActions';

class NavigationBar extends React.Component {
  logout(e){
    e.preventDefault();
    this.props.logout();
  }

  render() {
    const { isAuthenticated } = this.props.user;

    const userLinks = (
      <ul className="nav navbar-nav navbar-right">
        <li><Link to="/settings">Settings</Link></li>
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
  user: React.PropTypes.object.isRequired,
  logout: React.PropTypes.func.isRequired
}

function mapStateToProps(state){
  return{
    user: state.user
  };
}

export default connect(mapStateToProps, { logout })(NavigationBar);
