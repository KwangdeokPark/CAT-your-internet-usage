import React from 'react';
import {Bar, Line, Pie} from 'react-chartjs-2';
import axios from 'axios';
import GroupStats from '../stats/GroupStats';

class UserStatChart extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      chartData: undefined,
      members: []
      }
    }

  componentWillMount() {
    const groupUrl = 'http://13.125.151.229:8000/group/';
    const groupId = localStorage.getItem('groupId');

    let url1 = `${groupUrl}${groupId}/`;
    axios.get(url1)
         .then(res => {
            let memberslist = res.data.members;
            this.setState({members: memberslist});
         })
         .catch(err => console.log(err));


    const timelineUrl = 'http://13.125.151.229:8000/timeline/';
    const userId = localStorage.getItem('id');
    const group = '/group/';

    let url2 = `${timelineUrl}${userId}${group}${groupId}/`;
    axios.get(url2)
         .then(res =>
           {
            let cdata = res.data;
            cdata.yname = "Your";
            this.setState({
              chartData: cdata
            })
          })
         .catch(err => console.log(err))
  }

  render() {
      return (
        <div>
          { this.state.chartData != undefined
            ? (
              <div>
                <div style={{border: '4px solid #777', margin: '20px', padding: '20px'}} >
                  <h1>Members ({this.state.members.length})</h1>
                  {this.state.members.map((member) => <p key={member}>- {member}</p> )}
                </div>
                <GroupStats statsData={this.state.chartData}/>
              </div>
              )
            : (
                <div>
                  <h1>Loading...</h1>
                </div>
              )
          }
        </div>
      )
    }
  }

export default UserStatChart;
