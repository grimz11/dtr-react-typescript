import IUserOutput from './dto/userOutput';
import http from '../httpService';
import AppConsts from '../../utils/appconst';

class UserService{
  public async getUser(id:number):Promise<any> {
    const res = await http.get(`${AppConsts.appBaseUrl}/users`)
    
    return res.data[0];
  }
}

export default new UserService();