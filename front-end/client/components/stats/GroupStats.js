import React from 'react';
import {Bar, Line, Pie} from 'react-chartjs-2';

class GroupStats extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      chartData: undefined
    }
  }
    
  componentWillMount() {
    console.log(this.props.statsData);
    let interv = (this.props.statsData.max - this.props.statsData.min)/10;
    let hourMs = 3600000;
    let minn = this.props.statsData.min / hourMs;
    let maxx = this.props.statsData.max / hourMs;
    
    this.setState({
      chartData:{
        labels: [ 
          `${minn + interv*0}` + '-' + `${minn + interv*1}`,
          `${minn + interv*1}` + '-' + `${minn + interv*2}`,
          `${minn + interv*2}` + '-' + `${minn + interv*3}`,
          `${minn + interv*3}` + '-' + `${minn + interv*4}`,
          `${minn + interv*4}` + '-' + `${minn + interv*5}`,
          `${minn + interv*5}` + '-' + `${minn + interv*6}`,
          `${minn + interv*6}` + '-' + `${minn + interv*7}`,
          `${minn + interv*7}` + '-' + `${minn + interv*8}`,
          `${minn + interv*8}` + '-' + `${minn + interv*9}`,
          `${minn + interv*9}` + '-' + `${minn + interv*10}`,
        ],
        datasets: [
          {
            label: '# of user',
            data: [
              this.props.statsData.a1,
              this.props.statsData.a2,
              this.props.statsData.a3,
              this.props.statsData.a4,
              this.props.statsData.a5,
              this.props.statsData.a6,
              this.props.statsData.a7,
              this.props.statsData.a8,
              this.props.statsData.a9,
              this.props.statsData.a10
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
    });

    console.log(this.state.chartData.datasets[0].backgroundColor[this.props.statsData.userbin]);
    
    this.setState({
      chartData.datasets[0].backgroundColor[this.props.statsData.userbin]: 'rgba(254, 103, 99, 1)'
    });
  }

  render() {

    console.log(chartDate);
    return (
      <div>
        { this.state.chartData != undefined
          ? (
              <div className = "chart">
                <bar
                  data = {this.state.chartData}
                  options={{
                    title:{
                      display: true,
                      text: this.props.statsData.groupname,
                      fontSize: 25
                    },
                    legend:{
                      display: true,
                      position: 'right'
                    },
                    maintainAspectRatio: false
                  }}
                /><br/>
                <h1>You are the {"top"} {this.props.statsData.percentage}%</h1><br/>
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

export default GroupStats;
