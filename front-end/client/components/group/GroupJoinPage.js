import React from 'react';
import axios from 'axios';
import { addFlashMessage } from '../../actions/flashMessages';
import { connect } from 'react-redux';

import {Router, browserHistory} from 'react-router';

class GroupJoinPage extends React.Component {
  constructor(props) {
  super(props);
  this.state = {
    user_id:localStorage.getItem('id'),
    groups:[]
  };
  this.onClickButton = this.onClickButton.bind(this);
}

  componentWillMount() {
    const url = 'http://13.125.151.229:8000/group/'
    axios.get(url)
         .then(response =>{
           //console.log(response.data);
           const groups = response.data;
           this.setState({groups});
    })
    .catch(err => console.log(err))
  }

  onClickButton(group){
    //add user to the group
    const url='http://13.125.151.229:8000/group/';
    const groupId= group.id;

    const groupUrl = `${url}${groupId}/`

    axios.put(groupUrl, this.state)
    .then(
      (res) => {

        this.props.addFlashMessage({
          type: 'success',
          text: 'Joined the group!'
        });
        localStorage.setItem('groupId', group.id);
      },
      (err) => {
        this.props.addFlashMessage({
          type: 'error',
          text: 'Try Again!'
        });
        this.setState({ errors: err.response.data, isLoading: false })
      }
    );

    browserHistory.push('group/detail/');
  }

  render() {
    //var thisGroup = this.state.groups.map(group =>
    return (
      <form>
      <h1>Join a group!</h1>
      <div style={{border: '4px solid #777', margin: '20px', padding: '20px', backgroundColor: "#CDCFB7"}} >
      <ul >
        { this.state.groups.map((group )=>{
          //console.log(group.id);
          return <div key={group.id}><button key= {group.id} onClick={() =>this.onClickButton(group)}>{group.name}</button></div>
        })}
      </ul>
      </div>
      </form>
    );
  }
}
GroupJoinPage.propTypes = {
  addFlashMessage: React.PropTypes.func.isRequired
}

export default connect(null, { addFlashMessage }) (GroupJoinPage);
