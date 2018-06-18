import React from 'react';
import axios from 'axios';

import {Router, browserHistory} from 'react-router';
/*
import styled from 'styled-components';

const button = styled.button`
  background: red;
  border-radius: 8px;
  color: white;
`;*/

class GroupForm extends React.Component {
  constructor(props) {
  super(props);
  this.state = {
    groups:[]
  };
  this.onClickButton = this.onClickButton.bind(this);
}

  componentWillMount() {
    const userUrl = 'http://13.125.151.229:8000/users_group/'
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
      <div>
      <h1>Your Group List</h1>

      <div style={{border: '4px solid #777', height:'1000',width:'1000', padding: '10px', backgroundColor: "#E8DAFB"}} >
      <ul >
        { this.state.groups.map((group )=>{
          //console.log(group.id);
          return <div key={group.id}><button key={group.id} onClick={() =>this.onClickButton(group)}>{group.name}</button></div>
        })}
      </ul>
      </div>
      </div>
      </form>
    );
  }
}

export default GroupForm
