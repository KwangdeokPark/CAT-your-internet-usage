import React from 'react';
import axios from 'axios';
export default class GroupForm extends React.Component {

   constructor(){
     super();
     this.state = {
        jsonReturnedValue: []
     }
     
   }

  componentWillMount() {
    const userUrl = 'http://127.0.0.1:8000/users/'
    const id = localStorage.getItem('id')
    let url = `${userUrl}${id}/`
    console.log(url)

     axios.get(url)
    .then(response =>{
      console.log(response.data);
      this.setState({
        jsonReturnedValue: response.data
      })
    })
    .catch(err => console.log(err))

  }



  render() {
    return (
      <div>
        <h1>{this.state.jsonReturnedValue}</h1>
      </div>
    );
  }
}
