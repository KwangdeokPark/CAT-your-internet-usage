import React from 'react';
import SignupForm from './SignupForm';
import { connect } from 'react-redux';
import { userSignupRequest } from '../../actions/signupActions';
import { addFlashMessage } from '../../actions/flashMessages';

class SignupPage extends React.Component{
  render(){
    var SignupStyle = {
      padding: 10,
      margin: 10,
      backgroundColor: "Ff0000",

    };

    const { userSignupRequest, addFlashMessage} = this.props;
    return(
      <div className="row" style = {SignupStyle} >
        <div className="col-md-4 col-md-offset-4">
          <SignupForm userSignupRequest={userSignupRequest} addFlashMessage={addFlashMessage}/>
        </div>
      </div>
    );
  }
}

SignupPage.propTypes = {
  userSignupRequest: React.PropTypes.func.isRequired,
  addFlashMessage: React.PropTypes.func.isRequired
}

export default connect(null,{ userSignupRequest, addFlashMessage})(SignupPage);
