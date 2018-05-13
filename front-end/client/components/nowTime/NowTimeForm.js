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

  isLogin(prop) {
    return !(prop.stateUser.id === '')
  }

  checkRecord(prop) {
    let nt = new Date();
    let dt = nt - (new Date(prop.stateUser.last_record_time)) + 100;
    if(dt > 5000) {
      let spent = (new Date(prop.stateUser.last_record_time)) - (new Date(prop.stateUser.now_start_time));
      console.log("put today");
      prop.onPutToday(prop.stateUser.id, spent + prop.stateUser.today_spent_time, nt.toISOString());
    }
  }
 
  componentDidMount() {
    console.log("mount");
    if(this.isLogin(this.props)) {
      this.checkRecord(this.props);
    }
    this.interval = setInterval(() => {
      if(this.isLogin(this.props)) {
        this.props.onPutLast(this.props.stateUser.id, (new Date()).toISOString(), false);
      }
      this.setState({nowTime: new Date()});
    }, 500);
  }

  componentWillUpdate(nextProps, nextState) {
    if((!(this.isLogin(this.props))) && (this.isLogin(nextProps))) {
      this.checkRecord(nextProps)
    }
    
    if(this.isLogin(nextProps)) {
      let dt = nextState.nowTime - (new Date(nextProps.stateUser.now_start_time)) + 100;
      document.title = this.timeString(dt)
    }
    else {
      document.title = 'login first'
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  render() {    
    let inputId;
    
    const onSubmit = () => {
      if(inputId != undefined) {
        this.props.onLogin(inputId.value);
        inputId.value = '';
      }
    };

    const onOut = () => {
      console.log("put last");
      this.props.onPutLast(this.props.stateUser.id, (new Date()).toISOString(), true);
    }
      
    let dt=0;
    let tt=0;

    if (this.isLogin(this.props)) {
      dt = this.state.nowTime - (new Date(this.props.stateUser.now_start_time)) + 100;
      tt = Math.floor(this.props.stateUser.today_spent_time/1000)*1000;
    }

    return (
      <div>
        <div>
          { this.isLogin(this.props)
            ? (
                <div>
                  <p1>Hi, {this.props.stateUser.username}</p1><br/>
                  <button onClick={onOut}>LOGOUT</button><br/>
                  <h1>You now use {this.timeString(dt)}</h1><br/>
                  <h1>You today use {this.timeString(dt + tt)}</h1>
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
