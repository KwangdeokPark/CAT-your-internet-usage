import React from 'react';
import {Bar, Line, Pie} from 'react-chartjs-2';
import GroupStats from './GroupStats'
import axios from 'axios';

class StatsPage extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      chartData:{
        labels: ['Sun', 'Mon', 'Tue', 'Wed','Thu', 'Fri', 'Sat'],
        datasets: [
          {
            label: 'hour',
            data: [
              0,
              0,
              0,
              0,
              0,
              0,
              0
            ],
            backgroundColor: [
              'rgba(255, 99, 132, 0.6)',
              'rgba(54, 162, 235, 0.6)',
              'rgba(255, 206, 86, 0.6)',
              'rgba(75, 192, 192, 0.6)',
              'rgba(153, 102, 255, 0.6)',
              'rgba(255, 159, 64, 0.6)',
              'rgba(255, 99, 132, 0.6)',
            ]
          }
        ]
      }
    }
  }

  componentWillMount() {
    const timelineUrl = 'http://127.0.0.1:8000/timeline/';
    const Id = localStorage.getItem('id');
    let url = `${timelineUrl}${Id}/`;
    let hourMs = 3600000;
    axios.get(url)
         .then(res => this.setState({
           chartData:{
              labels: ['Sun', 'Mon', 'Tue', 'Wed','Thu', 'Fri', 'Sat'],
              datasets:[
                {
                  label:'hour',
                  data:[
                    res.data.sun_average/hourMs,
                    res.data.mon_average/hourMs,
                    res.data.tue_average/hourMs,
                    res.data.wed_average/hourMs,
                    res.data.thu_average/hourMs,
                    res.data.fri_average/hourMs,
                    res.data.sat_average/hourMs
                  ],
                  backgroundColor:[
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(153, 102, 255, 0.6)',
                    'rgba(255, 159, 64, 0.6)',
                    'rgba(255, 99, 132, 0.6)'
                  ]
                }
              ]
         }}))
         .catch(err => console.log(err))
  }

  render(){

    return (
      <div className = "chart">
        <Bar
          data={this.state.chartData}
          options={{
           title:{
              display:true,
              text:'Daily internet usage time',
              fontSize:25
           },
            legend:{
              display: true,
              position:'right'
            },
            maintainAspectRatio: false
          }}
        /><br/>
      </div>
    )
  }

}

export default StatsPage;
