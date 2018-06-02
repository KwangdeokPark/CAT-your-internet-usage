import React from 'react';
import axios from 'axios';

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

  render() {
    return (
      <form>
      <h1>Group Lists</h1>
      <ul>
        { this.state.groups.map(group => <li>{group.name}</li>)}
      </ul>
      </form>
    );
  }
}

export default GroupForm
