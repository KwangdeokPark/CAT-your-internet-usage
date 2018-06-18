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
    let hourMs = 3600000;
    let minn = this.props.statsData.min / hourMs;
    let maxx = this.props.statsData.max / hourMs;
    let interv = (maxx - minn) / 10;
    let fn;

    if(maxx < 1) fn = 3;
    else if(maxx < 10) fn = 2;
    else if(maxx < 100) fn = 1;
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
            this.props.statsData.bin1,
            this.props.statsData.bin2,
            this.props.statsData.bin3,
            this.props.statsData.bin4,
            this.props.statsData.bin5,
            this.props.statsData.bin6,
            this.props.statsData.bin7,
            this.props.statsData.bin8,
            this.props.statsData.bin9,
            this.props.statsData.bin10
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

    newData.datasets[0].backgroundColor[this.props.statsData.user_bin - 1] = 'rgba(254, 103, 99, 1)';

    this.setState({
      chartData: newData
    });
  }

  render() {
    console.log(this.props.statsData);
    return (
      <div>
        { this.state.chartData != undefined
          ? (
              <div style={{border: '4px solid #777', margin: '20px', padding: '20px'}}>
                <Bar
                  data = {this.state.chartData}
                  width={50}
                  height={25}
                  options={{
                    title:{
                      display: true,
                      text: this.props.statsData.yname + " stats in <"+this.props.statsData.group_name+">",
                      fontSize: 25
                    },
                    legend:{
                      display: true,
                      position: 'bottom'
                    },
                    maintainAspectRatio: true,
                    scales: {
                      xAxes: [{
                        ticks: {
                          fontSize: 14
                        }
                      }]
                    }
                  }}
                /><br/>
                <h1>{this.props.statsData.yname} internet usage is {"top"} {this.props.statsData.percentage.toFixed(2)}%</h1><br/>
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
