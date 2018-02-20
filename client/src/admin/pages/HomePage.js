/**
 * Created by Henry Huang.
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
//import { } from 'semantic-ui-react';
import TopBar from '../common/components/TopBar';
import { push } from "react-router-redux";
import { authenticate } from "../modules/auth";
import { bindActionCreators } from "redux";

class Home extends Component {

  constructor(props) {
    super(props);
    this.logout = () => {
      localStorage.removeItem('admin');
      this.props.changePage('/login');
    }
  }

  render() {
    return (
      <div>
        <TopBar logout={this.logout} />
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
