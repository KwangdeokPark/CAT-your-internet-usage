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

  componentWillMount() {
    axios.post('http://13.125.151.229:8000/users/',this.state)
         .then(response => this.setState({
           alert_start_time: response.data.setting.alert_start_time/3600000,
           alert_interval: response.data.setting.alert_interval/60000
         }))
         .catch(err => console.log(err))

    if(localStorage.getItem('username')=='')
      this.context.router.push('/sign_in');

  }

  onClickButton(){
    this.context.router.push('/settingsEdit');
  }

  render(){
    const { errors }=this.state;

    return(
      <form>
        <h1>Current Settings</h1>

        <div >
          <label className="control-label">Alert Start Time:  After {this.state.alert_start_time} hours</label>
        </div>

        <div >
          <label className="control-label" >Alert Interval: Every {this.state.alert_interval} minute</label>
        </div>

        <div className="form-group">
          <button className="btn btn-primary btn-lg" onClick={this.onClickButton}>
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
