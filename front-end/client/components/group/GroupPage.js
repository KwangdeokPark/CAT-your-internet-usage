import React from 'react';
import GroupForm from './GroupForm';
import { connect } from 'react-redux';

class GroupPage extends React.Component{


  render(){

    return(
      <div className="row">
        <div className="col-md-4 col-md-offset-4">
          <GroupForm />
        </div>
      </div>
    );
  }
}

export default GroupForm;
