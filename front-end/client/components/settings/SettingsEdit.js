import React from 'react';
import classnames from 'classnames';
import validateInput from '../../../server/shared/validations/settings';
import TextFieldGroup from '../common/TextFieldGroup';
import { browserHistory } from 'react-router';

class SettingsEdit extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      id:'',
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

  onSubmit(e) {
    e.preventDefault();

    if (this.isValid()) {
      this.setState({ errors: {}, isLoading: true });
      this.props.putSetting(this.state).then(
        () => {
          this.props.addFlashMessage({
            type: 'success',
            text: 'Succeffully changed setting!'
          });
          this.context.router.push('/main');
        },
        (err) => {
          this.props.addFlashMessage({
            type: 'error',
            text: 'Sorry. Try Again!'
          });
          this.setState({ errors: err.response.data, isLoading: false })
        }
      );
    }
  }

  isValid(){
    const {errors, isValid } = validateInput(this.state);

    if(!isValid){
      this.setState({errors});
    }
    return isValid;
  }

  render(){
    const { errors }=this.state;
    return(
      <form onSubmit={this.onSubmit}>
        <h1>Edit Settings</h1>

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
            Submit
          </button>
        </div>
      </form>
    );
  }
}

SettingsEdit.contextTypes = {
  router: React.PropTypes.object.isRequired
}

export default SettingsEdit;
