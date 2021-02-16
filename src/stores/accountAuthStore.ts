import { action, observable } from "mobx";

import accountAuthService from "../services/accountAuth/accountAuthService";
import ILoginInput from "../services/accountAuth/dto/loginInput";
import ILoginOutput from "../services/accountAuth/dto/loginOutput";
import utils from '../utils/utils';


class AccountAuthStore {

  @action
  async login(model: ILoginInput):Promise<ILoginOutput> {
    const res = await accountAuthService.login({
      identifier: model.identifier,
      password: model.password,
    });
    utils.setCookie('access_token', res.jwt);
    utils.setCookie('id', res.user?.id);
    return res;
  }
  
  get isAuthenticated(): boolean {
    if (!utils.getCookie('access_token')) return false;

    return true;
  }

  @action
  async logout() {
    utils.removeToken();
  }
}

export default AccountAuthStore;
