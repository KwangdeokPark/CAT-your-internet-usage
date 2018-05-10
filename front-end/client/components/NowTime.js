import React from 'react';

class NowTime extends React.Component{

  constructor(props) {
    super(props);

    this.state = {
      sT: new Date(),
      nT: new Date()
    }
  }

  componentDidMount() {
    this.setState({
      sT: new Date()
    });
    this.interval = setInterval(() => {this.setState({nT: new Date()});}, 1000);
  }

  componentWillUpdate(nextProps, nextState) {
    document.title = Math.floor((this.state.nT - this.state.sT + 100)/3600000) + "h " + Math.floor((this.state.nT - this.state.sT + 100)/60000) + "m " + Math.floor((this.state.nT - this.state.sT + 1100)/1000) + "s"
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  render() {
    return (
      <div>
        <h1>st: {this.state.sT.toLocaleTimeString()}</h1><br/>
        <h1>nt: {this.state.nT.toLocaleTimeString()}</h1><br/>
        <h1>You use {Math.floor((this.state.nT - this.state.sT + 100)/(3600000))}h {Math.floor((this.state.nT - this.state.sT + 100)/(60000))}m {Math.floor((this.state.nT - this.state.sT + 100)/(1000))}s</h1>
      </div>
    );
  }
}

export default NowTime;
