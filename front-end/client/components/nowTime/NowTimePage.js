import React from 'react';
import { connect } from 'react-redux';
import NowTimeForm from './NowTimeForm'

class NowTimePage extends React.Component {
  render() {
    var nowTimeStyle = {
      padding: 10,
      margin: 10,
      backgroundColor: "FFDE00",
      display: "inline-block",
      fontFamily: "monospace",
      fontSize: "32px",
      textAlign: "center"
    };

    return (
      <NowTimeForm style={nowTimeStyle} stateUser={this.props.stateUSer} />
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
