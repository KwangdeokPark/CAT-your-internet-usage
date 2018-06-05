import React from 'react';
import { connect } from 'react-redux';
import NowTimeForm from './NowTimeForm'

class NowTimePage extends React.Component {
  render() {
    return (
      <NowTimeForm stateUser={this.props.stateUser} />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    stateUser: state.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NowTimePage)
