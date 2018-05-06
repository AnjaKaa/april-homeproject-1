import React, { PureComponent } from 'react';
import { Switch, Route } from 'react-router-dom';
import PrivateRoute from '../PrivateRoute';
import UserPage from '../UserPage';
import Login from '../Login';

class AppRouter extends PureComponent {
  render() {
    return (
      <Switch>
        <Route path="/" exact component={UserPage} />
        <Route path="/login" exact component={Login} />
        <PrivateRoute pathName="/users/me" component={UserPage} />
        <PrivateRoute pathName="/users/:login" component={UserPage} />
      </Switch>
    );
  }
}

export default AppRouter;
