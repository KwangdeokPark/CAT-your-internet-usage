import React from 'react';
import {Bar, Line, Pie} from 'react-chartjs-2';
import axios from 'axios';

class UserStatChart extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      groupname:'',
      percentage:'',
      chartData: undefined,
      members: ''
      }
    }

  componentWillMount() {
    const groupUrl = 'http://127.0.0.1:8000/group/';
    const groupId = localStorage.getItem('groupId');

    let url1 = `${groupUrl}${groupId}/`;
    //console.log(url1);
    axios.get(url1)
         .then(res => {
console.log('group detail:axios put request');
            let memberslist = res.data.members;
            this.setState({members: memberslist});
         })
         .catch(err => console.log(err));


    const timelineUrl = 'http://127.0.0.1:8000/timeline/';
    const userId = localStorage.getItem('id');
    const group = '/group/';

    let url2 = `${timelineUrl}${userId}${group}${groupId}/`;
    axios.get(url2)
         .then(res =>
           {
             console.log(url2);
             let hourMs = 3600000;
             let minn = res.data.min;
             let maxx = res.data.max;
             let interv = (maxx - minn) / 10;
             let fn;

             if(maxx < 1) fn = 3;
             else if(maxx < 10) fn = 2;
             else if(maxx <  100) fn = 1;
             else fn = 0;

             let newData = {
                labels: [
                  '~'+`${(minn + interv*1).toFixed(fn)}`+'h',
                  '~'+`${(minn + interv*2).toFixed(fn)}`+'h',
                  '~'+`${(minn + interv*3).toFixed(fn)}`+'h',
                  '~'+`${(minn + interv*4).toFixed(fn)}`+'h',
                  '~'+`${(minn + interv*5).toFixed(fn)}`+'h',
                  '~'+`${(minn + interv*6).toFixed(fn)}`+'h',
                  '~'+`${(minn + interv*7).toFixed(fn)}`+'h',
                  '~'+`${(minn + interv*8).toFixed(fn)}`+'h',
                  '~'+`${(minn + interv*9).toFixed(fn)}`+'h',
                  '~'+`${(minn + interv*10).toFixed(fn)}`+'h'
                ],
                datasets: [
                {
                  label: '# of user',
                  data: [
                    res.data.bin1,
                    res.data.bin2,
                    res.data.bin3,
                    res.data.bin4,
                    res.data.bin5,
                    res.data.bin6,
                    res.data.bin7,
                    res.data.bin8,
                    res.data.bin9,
                    res.data.bin10
                  ],
                  backgroundColor: [
                    'rgba(194, 203, 206, 1)',
                    'rgba(194, 203, 206, 1)',
                    'rgba(194, 203, 206, 1)',
                    'rgba(194, 203, 206, 1)',
                    'rgba(194, 203, 206, 1)',
                    'rgba(194, 203, 206, 1)',
                    'rgba(194, 203, 206, 1)',
                    'rgba(194, 203, 206, 1)',
                    'rgba(194, 203, 206, 1)',
                    'rgba(194, 203, 206, 1)',
                  ]
                }
              ]
            }
            newData.datasets[0].backgroundColor[res.data.user_bin - 1] = 'rgba(254, 103, 99, 1)';

            this.setState({
              groupname: res.data.group_name,
              percentage:res.data.percentage,
              chartData: newData
            });
          })
         .catch(err => console.log(err))
  }

  render() {
      return (
        <div>
          { this.state.chartData != undefined
            ? (

                <div>
                <h1>Members</h1>
                <p key={this.state.members.id}>{this.state.members}</p>
                  <Bar
                    data = {this.state.chartData}
                    width={50}
                    height={25}
                    options={{
                      title:{
                        display: true,
                        text: "Your stat in "+this.state.groupname,
                        fontSize: 25
                      },
                      legend:{
                        display: true,
                        position: 'right'
                      },
                      maintainAspectRatio: true
                    }}
                  /><br/>
                  <h1>Your internet usage is {"top"} {this.state.percentage}%</h1><br/>
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
