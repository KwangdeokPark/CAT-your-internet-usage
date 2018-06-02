import React from 'react';
import { connect } from 'react-redux';
import NowTimeForm from './NowTimeForm'

class NowTimePage extends React.Component {
  render() {
    //localStorage.setItem('route', 'main');
    return (
      <NowTimeForm stateUser={this.props.stateUSer} />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    stateUSer: state.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NowTimePage)
