import React from 'react';
import {Bar, Line, Pie} from 'react-chartjs-2';
import axios from 'axios';
import GroupStats from '../stats/GroupStats';

class GroupStatChart extends React.Component{
  constructor(props){
    super(props);
    this.state = {
//      groupname:'',
//      percentage:'',
      chartData: undefined,
      }
    }

  componentWillMount() {
    const groupStatUrl = 'http://13.125.151.229:8000/group_stat/';
    const groupId = localStorage.getItem('groupId');
    let url2 = `${groupStatUrl}${groupId}/`;
    axios.get(url2)
         .then(res =>
           {
            let cdata = res.data;
            cdata.group_name = "all group"
            cdata.yname = "Your group's"
            this.setState({
              chartData: cdata
            });
          })
         .catch(err => console.log(err))
  }

  render() {
      return (
        <div>
          { this.state.chartData != undefined
            ? (
                <GroupStats statsData={this.state.chartData} />
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

export default GroupStatChart;
