import { action, observable } from 'mobx';
import userService from '../services/user/userService';

class UserStore {
  @observable users!:any;
  
  @action
  async getUser(id: number) {
    let result = await userService.getUser(id);
    console.log('result', result);
    return result;
  }
}
export default UserStore;