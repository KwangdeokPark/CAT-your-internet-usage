import React from 'react';
import main from './main.png'


class Greetings extends React.Component{
  render() {
    return (
      <div className = "jumbotron">
        <ul>
        <img src={main} alt="main" width="1000" height="1500" />
        </ul>
      </div>
    );
  }
}

export default Greetings;
