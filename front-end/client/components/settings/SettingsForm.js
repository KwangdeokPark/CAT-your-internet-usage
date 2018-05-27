import React from 'react';

import classnames from 'classnames';
import validateInput from '../../../server/shared/validations/settings';
import TextFieldGroup from '../common/TextFieldGroup';
import { browserHistory } from 'react-router';

import axios from 'axios';

class SettingsForm extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      username:localStorage.getItem('username'),
      alert_start_time:'',
      alert_interval:'',
      errors:{},
      isLoading: false
    }
    this.onClickButton = this.onClickButton.bind(this);
  }

  componentDidMount() {
    axios.get(`http://127.0.0.1:8000/users/`)
         .then(response => this.setState({
           alert_start_time: response.data.alert_start_time,
           alert_interval: response.data.alert_interval
         }))
         .catch(err => console.log(err))
  }

  onClickButton(){
    this.context.router.push('/settingsEdit');
  }

  render(){
    const { errors }=this.state;
    return(
      <form>
        <h1>Settings</h1>

        <div >
          <label className="control-label">Alert Start Time:  {this.state.alert_start_time}</label>
        </div>

        <div >
          <label className="control-label" >Alert Interval: {this.state.alert_interval}</label>
        </div>

        <div className="form-group">
          <button  className="btn btn-primary btn-lg" onClick={this.onClickButton}>
            Edit
          </button>
        </div>
      </form>
    );
  }
}

SettingsForm.contextTypes = {
  router: React.PropTypes.object.isRequired
}

export default SettingsForm;
