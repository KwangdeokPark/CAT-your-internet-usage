import React from 'react';
import GroupForm from './GroupForm';

/*
<div className="row">
  <div className="col-md-4 col-md-offset-4">
    <GroupForm />
  </div>
</div>
*/
class GroupPage extends React.Component{
  render(){
    return(
        <div className="container"><GroupForm />
      </div>
    );
  }
}

export default GroupPage;
