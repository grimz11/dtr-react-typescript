import IUserOutput from './dto/userOutput';
import http from '../httpService';
import AppConsts from '../../utils/appconst';

class UserService{
  public async getCurrentLoginUser(id:number):Promise<any> {
    const res = await http.get(`${AppConsts.appBaseUrl}/users/${id}`)
    
    return res.data;
  }
  public async getAllUsers():Promise<any> {
    const res = await http.get(`${AppConsts.appBaseUrl}/users`)
    
    return res.data;
  }
}

export default new UserService();