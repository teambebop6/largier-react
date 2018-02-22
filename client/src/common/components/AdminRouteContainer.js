/**
 * Created by Henry Huang.
 */
import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

class AdminRouteContainer extends React.Component {
  render() {
    const {
      component: Component,
      auth,
      ...rest
    } = this.props;
    const isAuthenticated = auth && auth.token && auth.role === 'admin';
    console.log(auth);
    console.log(isAuthenticated);
    return (
      <Route
        {...rest}
        render={props =>
          isAuthenticated
            ? <Component {...props}/>
            : (
              <Redirect to={{
                pathname: '/login',
                state: { from: props.location }
              }}/>
            )
        }
      />
    )
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
  }
};

export default connect(mapStateToProps)(AdminRouteContainer);