import React from 'react';


class SignupForm extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      username: '',
      password:'',
      passwordConfirmation:'',
      age:'',
      alertStartTime:'',
      alertInterval:''
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    }

  onChange(e) {
      this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e){
    e.preventDefault();
    this.props.userSignupRequest(this.state);
    //console.log(this.state);
    //axios.post('/api/users',{user: this.state });
  }



  render(){
    return(
      <form onSubmit={this.onSubmit}>
        <h1>Join us!</h1>

        <div className="form-group">
          <label className="control-label">Username</label>
          <input
            value={this.state.username}
            onChange={this.onChange}
            type="text"
            name="username"
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label className="control-label">Password</label>
          <input
            value={this.state.password}
            onChange={this.onChange}
            type="password"
            name="password"
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label className="control-label">Password Confirmation</label>
          <input
            value={this.state.passwordConfirmation}
            onChange={this.onChange}
            type="password"
            name="passwordConfirmation"
            className="form-control"
          />
        </div>

<       div className="form-group">
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
        </div>

        <div className="form-group">
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
        </div>

        <div className="form-group">
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
        </div>

        <div className="form-group">
          <button className="btn btn-primary btn-lg">
            Sign up
          </button>
        </div>
      </form>
    );
  }
}

SignupForm.propTypes = {
  userSignupRequest: React.PropTypes.func.isRequired
}

export default SignupForm;
