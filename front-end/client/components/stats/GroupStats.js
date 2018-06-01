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
    let interv = (this.props.statsData.max - this.props.statsData.min)/10;
    let minn = this.props.statsData.min;
    let maxx = this.props.statsData.max;
    
    let chartData = {
      labels: [ `${minn + interv*0}` + '-' + `${minn + interv*1}`,
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
            this.props.statsData.1,
            this.props.statsData.1,
            this.props.statsData.1,
            this.props.statsData.1,
            this.props.statsData.1,
            this.props.statsData.1,
            this.props.statsData.1,
            this.props.statsData.1,
            this.props.statsData.1,
            this.props.statsData.1
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
    
    chartData.datasets[0].background[this.props.statsData.?] = 'rgba(254, 103, 99, 1)';
  }

  render() {
    return (
      <div>
        { this.state.chardata != undefined
          ? (
              <div className = "chart">
                <bar
                  data = {this.state.chartData}
                  options={{
                    title:{
                      display: true,
                      text: {this.props.statsData.groupname},
                      fontSize: 25
                    },
                    legend:{
                      display: true,
                      position: 'right'
                    },
                    maintainAspectRatio: false
                  }}
                /><br/>
                <h1>You are the {"top"} {this.props.statsData.percent}%</h1><br/>
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
