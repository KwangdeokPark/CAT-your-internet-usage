import React from 'react';
import GroupCreateForm from './GroupCreateForm';

class GroupCreatePage extends React.Component{
  render(){
    return(
      <div className="row">
        <div className="col-md-4 col-md-offset-4">
          <GroupCreateForm />
        </div>
      </div>
    );
  }
}

export default GroupCreatePage;
