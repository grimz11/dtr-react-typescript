import http from '../httpService';
import ILoginInput from './dto/loginInput';
import ILoginOutput from './dto/loginOutput';
import { IRegisterInput } from './dto/registerInput';
import { IRegisterOutput } from './dto/registerOutput';
import utils from '../../utils/utils';

class AccountAuthService {
  public async register(registerInput: IRegisterInput): Promise<IRegisterOutput> {
    let res = await http.post('auth/local/register', registerInput);
    return res.data.result;
  }

  public async login(loginInput: ILoginInput): Promise<ILoginOutput> {
    let res = await http.post('auth/local', loginInput);
    console.log('res login', res.data);
    
    // utils.setCookie('id',res.data.id);
    return res.data;
  }
}

export default new AccountAuthService();