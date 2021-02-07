import * as React from 'react';

import { Route, Switch } from 'react-router-dom';

import ProtectedRoute from './ProtectedRoute';
import utils from '../../utils/utils';

const Router = () => {
  const UserLayout = utils.getRoute('/user').component;
  const Dashboard = utils.getRoute('/dashboard').component;
  const Home = utils.getRoute('/').component;
  const Logout = utils.getRoute('/logout').component;
  // const AppLayout = utils.getRoute('/').component;

  return (
    <Switch>
      <Route path="/user/login" render={(props: any) => <UserLayout {...props} />} />
      <ProtectedRoute path="/" render={(props: any) => <Home {...props} />} />
      <ProtectedRoute path="/dashboard" render={(props: any) => <Dashboard {...props} exact />} />
      <ProtectedRoute path="/logout" render={(props: any) => <Logout {...props} exact />} />
    </Switch>
  );
};

export default Router;
