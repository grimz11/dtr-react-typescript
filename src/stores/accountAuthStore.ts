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

  @action
  async logout(): Promise<string> {
    utils.removeToken();
    return "Successfully Logout";
  }
}

export default AccountAuthStore;