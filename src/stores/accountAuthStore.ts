import { makeAutoObservable } from "mobx";

import accountAuthService from "../services/accountAuth/accountAuthService";
import ILoginInput from "../services/accountAuth/dto/loginInput";
import utils from "../utils/utils";

class AccountAuthStore {
  $token: string = "";
  $userId: string = "";

  constructor() {
    makeAutoObservable(this);
  }

  async login(model: ILoginInput): Promise<void> {
    const res = await accountAuthService.login({
      identifier: model.identifier,
      password: model.password,
    });

    if (!res?.props?.isAxiosError) {
      utils.setCookie("access_token", res.jwt);
      utils.setCookie("id", res.user?.id);
    }
  }

  get isAuthenticated(): boolean {
    if (!utils.getCookie("access_token")) return false;

    return true;
  }

  async logout(): Promise<void> {
    await utils.removeToken();
  }
}

export default AccountAuthStore;
