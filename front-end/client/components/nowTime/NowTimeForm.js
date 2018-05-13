import React, { PropTypes } from 'react'

class NowTimeForm extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      nowTime: new Date()
    }
  }

  timeString(dt) {
    let ht = Math.floor(dt/3600000);
    let mt = (Math.floor(dt/60000))%60;
    let st = (Math.floor(dt/1000))%60;
    return ht + "h " + mt + "m " + st + "s"
  }
 
  componentDidMount() {
    console.log(new Date());
    console.log(new Date().toDateString());
    console.log(new Date().toGMTString());
    console.log(new Date().toISOString());
    console.log(new Date().toString());





    this.interval = setInterval(() => {this.setState({nowTime: new Date()});}, 500);
  }

  componentWillUpdate(nextProps, nextState) {
    if(this.props.stateUser.id === '') {
      document.title = 'login first';
    }
    else {
      let dt = this.state.nowTime - (new Date(this.props.stateUser.now_start_time)) + 500;
      document.title = this.timeString(dt)
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  render() {

    let isLogined = !(this.props.stateUser.id === '');
    
    let inputId;
    
    const onSubmit = () => {
      if(inputId != undefined) {
        this.props.onLogin(inputId.value);
        inputId.value = '';
      }
    };

    let dt=0;
    
    if (isLogined) {
      dt = this.state.nowTime - (new Date(this.props.stateUser.now_start_time)) + 100;
    }

    return (
      <div>
        <div>
          { isLogined
            ? (
                <div>
                  <p1>Hi, {this.props.stateUser.username}</p1><br/>
                  <button onClick={this.props.onLogout}>LOGOUT</button><br/>
                  <h1>You now use {this.timeString(dt)}</h1><br/>
                  <h1>You today use {this.timeString(dt + this.props.stateUser.today_spent_time)}</h1>
                </div>
              )
            : (
                <div>
                  id: <input ref={node => {inputId = node;}} /><br/>
                  <button type="submit" onClick={onSubmit}>LOGIN</button><br/>
                </div>
              )
          }
        </div>
      </div>
    )
  }
}

export default NowTimeForm;
