import * as React from 'react';

import { Route, Switch } from 'react-router-dom';

import ProtectedRoute from './ProtectedRoute';
import utils from '../../utils/utils';

const Router = () => {
  const UserLayout = utils.getRoute('/user').component;
  console.log('UserLayout', UserLayout);
  
  // const AppLayout = utils.getRoute('/').component;

  return (
    <Switch>
      <Route path="/" render={(props: any) => <UserLayout {...props} />} />
      {/* <ProtectedRoute path="/" render={(props: any) => <AppLayout {...props} exact />} /> */}
    </Switch>
  );
};

export default Router;
