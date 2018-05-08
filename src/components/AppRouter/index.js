import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import PrivateRoute from '../PrivateRoute';
import UserPage from '../UserPage';
import Login from '../Login';

class AppRouter extends Component {
  render() {
    return (
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/login" exact component={Login} />
        <PrivateRoute path="/users/me" component={UserPage} />
        <PrivateRoute path="/users/:login" component={UserPage} />
      </Switch>
    );
  }
}

export default AppRouter;
