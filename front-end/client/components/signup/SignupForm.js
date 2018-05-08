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
      password:'',
      passwordConfirmation:'',
      age:'',
      alertStartTime:'',
      alertInterval:'',
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

  onSubmit(e){
    e.preventDefault();

    if(this.isValid()) {
      this.setState({ errors: {}, isLoading: true });
      this.props.userSignupRequest(this.state).then(
        () => {
          this.props.addFlashMessage({
            type: 'success',
            text: 'You signed up successfully. Welcome!'
          });
          this.context.router.push('/');
        },
        ({ data }) => this.setState({ errors:data, isLoading:false })
      );
    }
    //console.log(this.state);
    //axios.post('/api/users',{user: this.state });
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
          error={errors.password}
          label="Password"
          onChange={this.onChange}
          value={this.state.password}
          field="password"
          type="password"
        />

        <TextFieldGroup
          error={errors.passwordConfirmation}
          label="Password Confirmation"
          onChange={this.onChange}
          value={this.state.passwordConfirmation}
          field="passwordConfirmation"
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
          <option value="1">0~9</option>
          <option value="2">10~19</option>
          <option value="3">20~29</option>
          <option value="4">30~39</option>
          <option value="5">40~49</option>
          <option value="6">50~59</option>
          <option value="2">60~69</option>
          <option value="3">70~79</option>
          <option value="4">80~89</option>
          <option value="5">90~99</option>
          <option value="6">100~</option>
          </select>
          {errors.age && <span className="help-block">{errors.age}</span>}
        </div>

        <div className={classnames("form-group", {'has-error':errors.alertStartTime})}>
          <label className="control-label">Alert Start Time</label>
          <select
            value={this.state.alertStartTime}
            onChange={this.onChange}
            name="alertStartTime"
            className="form-control">
            <option value="" disabled>Set alert start time.</option>
            <option value="1">After 1 hour</option>
            <option value="2">After 2 hours</option>
            <option value="3">After 3 hours</option>
          </select>
          {errors.alertStartTime && <span className="help-block">{errors.alertStartTime}</span>}
        </div>

        <div className={classnames("form-group", {'has-error':errors.alertInterval})}>
          <label className="control-label">Alert Interval</label>
          <select
            value={this.state.alertInterval}
            onChange={this.onChange}
            name="alertInterval"
            className="form-control">
            <option value="" disabled>Set alert interval.</option>
            <option value="1">5 minutes</option>
            <option value="2">15 minutes</option>
            <option value="3">30 minutes</option>
          </select>
          {errors.alertInterval && <span className="help-block">{errors.alertInterval}</span>}
        </div>

        <div className="form-group">
          <button disabled={this.state.isLoading} className="btn btn-primary btn-lg">
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

export default SignupForm;
