import http from "../httpService";
import ILoginInput from "./dto/loginInput";
import ILoginOutput from "./dto/loginOutput";
import { IRegisterInput } from "./dto/registerInput";
import { IRegisterOutput } from "./dto/registerOutput";

class AccountAuthService {
  public async register(
    registerInput: IRegisterInput,
  ): Promise<IRegisterOutput> {
    let res = await http.post("auth/local/register", registerInput);
    return res.data.result;
  }

  public async login(loginInput: ILoginInput): Promise<ILoginOutput> {
    let res = await http.post("auth/local", loginInput);
    // utils.setCookie('id',res.data.id);
    return res.data;
  }
}

export default new AccountAuthService();
