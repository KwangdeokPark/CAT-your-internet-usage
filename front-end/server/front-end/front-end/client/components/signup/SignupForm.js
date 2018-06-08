import React from 'react';
import classnames from 'classnames';
import validateInput from '../../../server/shared/validations/signup';
import TextFieldGroup from '../common/TextFieldGroup';
import { browserHistory } from 'react-router';

class SignupForm extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      username: '',
      password1:'',
      password2:'',
      age:'',
      alert_start_time:'',
      alert_interval:'',
      errors:{},
      isLoading: false
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    }

  onChange(e) {
      this.setState({ [e.target.name]: e.target.value });
  }

  isValid(){
    const {errors, isValid } = validateInput(this.state);

    if(!isValid){
      this.setState({errors});
    }
    return isValid;
  }

  onSubmit(e) {
    e.preventDefault();

    if (this.isValid()) {
      this.setState({ errors: {}, isLoading: true });
      this.props.userSignupRequest(this.state).then(
        () => {
          this.props.addFlashMessage({
            type: 'success',
            text: 'You signed up successfully. Welcome!'
          });
          this.context.router.push('/sign_in');
        },
        (err) => {
          this.props.addFlashMessage({
            type: 'error',
            text: 'Try Again!'
          });
          this.setState({ errors: err.response.data, isLoading: false })
        }
      );
    }
  }

  render(){
    const { errors }=this.state;
    return(
      <form onSubmit={this.onSubmit}>
        <h1>Join us!</h1>

        <TextFieldGroup
          error={errors.username}
          label="Username"
          onChange={this.onChange}
          value={this.state.username}
          field="username"
        />

        <TextFieldGroup
          error={errors.password1}
          label="Password"
          onChange={this.onChange}
          value={this.state.password1}
          field="password1"
          type="password"
        />

        <TextFieldGroup
          error={errors.password2}
          label="Password Confirmation"
          onChange={this.onChange}
          value={this.state.password2}
          field="password2"
          type="password"
        />

        <div className={classnames("form-group", {'has-error':errors.age})}>
        <label className="control-label">Age</label>
        <select
          value={this.state.age}
          onChange={this.onChange}
          name="age"
          className="form-control">
          <option value="" disabled>Set age group.</option>
          <option value="0">0~9</option>
          <option value="10">10~19</option>
          <option value="20">20~29</option>
          <option value="30">30~39</option>
          <option value="40">40~49</option>
          <option value="50">50~59</option>
          <option value="60">60~69</option>
          <option value="70">70~79</option>
          <option value="80">80~89</option>
          <option value="90">90~99</option>
          <option value="100">100~</option>
          </select>
          {errors.age && <span className="help-block">{errors.age}</span>}
        </div>

        <div className={classnames("form-group", {'has-error':errors.alert_start_time})}>
          <label className="control-label">Alert Start Time</label>
          <select
            value={this.state.alert_start_time}
            onChange={this.onChange}
            name="alert_start_time"
            className="form-control">
            <option value="" disabled>Set alert start time.</option>
            <option value="1">After 1 hour</option>
            <option value="2">After 2 hours</option>
            <option value="3">After 3 hours</option>
          </select>
          {errors.alert_start_time && <span className="help-block">{errors.alert_start_time}</span>}
        </div>

        <div className={classnames("form-group", {'has-error':errors.alert_interval})}>
          <label className="control-label">Alert Interval</label>
          <select
            value={this.state.alert_interval}
            onChange={this.onChange}
            name="alert_interval"
            className="form-control">
            <option value="" disabled>Set alert interval.</option>
            <option value="5">5 minutes</option>
            <option value="15">15 minutes</option>
            <option value="30">30 minutes</option>
          </select>
          {errors.alert_interval && <span className="help-block">{errors.alert_interval}</span>}
        </div>

        <div className="form-group">
          <button  className="btn btn-primary btn-lg">
            Sign up
          </button>
        </div>
      </form>
    );
  }
}

SignupForm.propTypes = {
  userSignupRequest: React.PropTypes.func.isRequired,
  addFlashMessage: React.PropTypes.func.isRequired
}

SignupForm.contextTypes = {
  router: React.PropTypes.object.isRequired
}

export default SignupForm;
