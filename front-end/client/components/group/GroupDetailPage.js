import React from 'react';
import {Bar, Line, Pie} from 'react-chartjs-2';
import axios from 'axios';
import UserStatChart from './UserStatChart';
import GroupStatChart from './GroupStatChart';

class GroupDetailPage extends React.Component{

  render() {
      return (
        <div className="container">
          <UserStatChart />
          <GroupStatChart/>
        </div>
      )
    }
  }

export default GroupDetailPage;
