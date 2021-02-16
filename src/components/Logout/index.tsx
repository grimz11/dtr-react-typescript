import * as React from 'react';

import Stores from '../../stores/storeIdentifier';
import { inject } from 'mobx-react';
import AccountAuthStore from '../../stores/accountAuthStore';

interface ILogoutProps {
  accountAuthStore?: AccountAuthStore;
}

@inject(Stores.AccountAuthStore)
class Logout extends React.Component<ILogoutProps> {
  async componentDidMount() {
    await this.props.accountAuthStore?.logout();
    window.location.href = '/user/login';
  }

  render() {
    return null;
  }
}

export default Logout;
