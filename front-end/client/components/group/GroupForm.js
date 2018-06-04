import React from 'react';
import axios from 'axios';

import {Router, browserHistory} from 'react-router';

class GroupForm extends React.Component {
  constructor(props) {
  super(props);
  this.state = {
    groups:[]
  };
  this.onClickButton = this.onClickButton.bind(this);
}

  componentWillMount() {
    const userUrl = 'http://127.0.0.1:8000/users_group/'
    const id = localStorage.getItem('id')
    let url = `${userUrl}${id}/`
    axios.get(url)
         .then(response =>{
           console.log(response.data);
           const groups = response.data;
           this.setState({groups});
    })
    .catch(err => console.log(err))
  }

  onClickButton(group){
    //store groupId(use it in group detail page)
    //move to this group's detail page

    localStorage.setItem('groupId', group.id);
    browserHistory.push('group/detail/');
  }

  render() {
    //var thisGroup = this.state.groups.map(group =>
    return (
      <form>
      <h1>Your Group List</h1>
      <ul >
        { this.state.groups.map((group )=>{
          //console.log(group.id);
          return <div key={group.id}><button key={group.id} onClick={() =>this.onClickButton(group)}>{group.name}</button></div>
        })}
      </ul>
      </form>
    );
  }
}

export default GroupForm
