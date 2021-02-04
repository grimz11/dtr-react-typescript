import { action, observable } from "mobx";

import accountAuthService from "../services/account/accountAuthService";
import ILoginInput from "../services/account/dto/loginInput";
import ILoginOutput from "../services/account/dto/loginOutput";
import utils from '../utils/utils';


class AccountAuthStore {
  @action
  async login(model: ILoginInput):Promise<ILoginOutput> {
    const res = await accountAuthService.login({
      identifier: model.identifier,
      password: model.password,
    });
    utils.setToken(res.jwt);
    return res;
  }
  async logout(): Promise<string> {

    utils.removeToken();
    return "Successfully Logout";
  }
}

export default AccountAuthStore;
