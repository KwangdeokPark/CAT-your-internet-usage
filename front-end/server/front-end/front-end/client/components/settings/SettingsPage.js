import React from 'react';
import SettingsForm from './SettingsForm';

class SettingsPage extends React.Component {
  render() {
    return (
      <div className="row">
        <div className="col-md-4 col-md-offset-4">
          <SettingsForm />
        </div>
      </div>
    );
  }
}

export default SettingsPage;
