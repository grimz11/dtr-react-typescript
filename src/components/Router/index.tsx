import * as React from 'react';

import { Route, Switch } from 'react-router-dom';

import ProtectedRoute from './ProtectedRoute';
import utils from '../../utils/utils';

const Router = () => {
  const UserLayout = utils.getRoute('/user').component;
  const Dashboard = utils.getRoute('/dashboard').component;
  
  // const AppLayout = utils.getRoute('/').component;

  return (
    <Switch>
      <Route path="/user/login" render={(props: any) => <UserLayout {...props} />} />
      <ProtectedRoute path="/" render={(props: any) => <Dashboard {...props} />} />
      <ProtectedRoute path="/dashboard" render={(props: any) => <Dashboard {...props} exact />} />
    </Switch>
  );
};

export default Router;
