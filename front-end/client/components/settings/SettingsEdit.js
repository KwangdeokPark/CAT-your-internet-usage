import React from 'react';
import classnames from 'classnames';
import validateInput from '../../../server/shared/validations/settings';
import TextFieldGroup from '../common/TextFieldGroup';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { addFlashMessage } from '../../actions/flashMessages';
import { putSetting } from '../../actions/userActions';
import axios from 'axios';

class SettingsEdit extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      username:localStorage.getItem('username'),
      setting_id:'',
      alert_start_time:'',
      alert_interval:'',
      errors:{},
      isLoading: false
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillMount() {
    axios.post('http://127.0.0.1:8000/users/',this.state)
         .then(response => this.setState({
           setting_id: response.data.id,
         }))
         .catch(err => console.log(err))
  }

  onChange(e) {
      this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    if (this.isValid()) {
      this.setState({ errors: {}, isLoading:true });
      const settingurl = 'http://127.0.0.1:8000/setting/';
      const settingId = this.state.setting_id;
      let url = `${settingurl}${settingId}/`;
      axios.put(url, {
        alert_start_time: this.state.alertStartTime,
        alert_interval: this.state.alertInterval
      }).then(res => {
        console.log(res.status);
        this.context.router.push('/main');
      }).catch(res => {console.log(res.error); this.context.router.push('/main');});

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

SettingsEdit.propTypes = {
  putSetting: React.PropTypes.func.isRequired,
  addFlashMessage: React.PropTypes.func.isRequired
}

SettingsEdit.contextTypes = {
  router: React.PropTypes.object.isRequired
}

//export default SettingsEdit;
export default connect(null, { putSetting, addFlashMessage })(SettingsEdit);
