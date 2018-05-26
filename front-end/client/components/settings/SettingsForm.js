import React from 'react';
import classnames from 'classnames';
import validateInput from '../../../server/shared/validations/settings';
import TextFieldGroup from '../common/TextFieldGroup';
import { browserHistory } from 'react-router';

class SettingsForm extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      alert_start_time:'',
      alert_interval:'',
      errors:{},
      isLoading: false
    }
    this.onClickButton = this.onClickButton.bind(this);
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
          <label className="control-label">Alert Start Time</label>
        </div>

        <div >
          <label className="control-label" >Alert Interval</label>
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
