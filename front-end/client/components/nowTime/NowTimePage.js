import React from 'react';
import { connect } from 'react-redux';
import NowTimeForm from './NowTimeForm'

class NowTimePage extends React.Component {
  render() {
    return (
      <NowTimeForm />
    )
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NowTimePage)
