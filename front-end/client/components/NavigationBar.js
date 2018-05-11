import React from 'react';
import { Link } from 'react-router';

export default () => {
  return (
    <nav className="navbar navbar-default">
      <div className="container-fluid">
        <div className="navbar-header">
          <Link to="/" className="navbar-brand">CAT</Link>
        </div>

        <div className="collapse navbar-collapse">
          <ul className="nav navbar-nav navbar-right">
            <li><Link to="/sign_up">Sign up</Link></li>
            <li><Link to="/sign_in">Sign in</Link></li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
