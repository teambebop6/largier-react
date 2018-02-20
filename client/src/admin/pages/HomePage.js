/**
 * Created by Henry Huang.
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import TopBar from '../common/components/TopBar';
import { push } from "react-router-redux";
import { authenticate } from "../modules/auth";
import { bindActionCreators } from "redux";

class Home extends Component {
  render() {
    return (
      <div>
        <TopBar />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  authenticate,
  changePage: (path) => push(path),
}, dispatch);

export default connect(
  null,
  mapDispatchToProps,
)(Home);
