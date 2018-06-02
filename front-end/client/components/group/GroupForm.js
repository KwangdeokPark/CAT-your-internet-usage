import React from 'react';
import axios from 'axios';

import {Router, browserHistory} from 'react-router';

class GroupForm extends React.Component {
  constructor(props) {
  super(props);
  this.state = {
    groups:[]
  }
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

  onClickButton(){
    browserHistory.push('/group/detail');
  }

  render() {
    return (
      <form>
      <h1>Your Group List</h1>
      <ul>
        { this.state.groups.map(group =>
          <li>
          {group.name}{"   "}
          <button onClick={this.onClickButton}>Detail</button>
          </li>
        )}
      </ul>
      </form>
    );
  }
}

export default GroupForm
