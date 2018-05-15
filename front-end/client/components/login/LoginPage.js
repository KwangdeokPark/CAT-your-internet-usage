import React from 'react';
import LoginForm from './LoginForm';
import { connect } from 'react-redux';
import { addFlashMessage } from '../../actions/flashMessages';

class LoginPage extends React.Component {
  render() {
    const { addFlashMessage } = this.props;
    return (
      <div className="row">
        <div className="col-md-4 col-md-offset-4">
          <LoginForm addFlashMessage={addFlashMessage} />
        </div>
      </div>
    );
  }
}
LoginPage.propTypes = {
  addFlashMessage: React.PropTypes.func.isRequired
}

export default connect(null,{ addFlashMessage })(LoginPage);
