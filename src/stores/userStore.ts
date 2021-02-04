import { action, observable } from 'mobx';
import CurrenUserLogin from '../services/accountAuth/dto/currentUserLogin';
import IUserOutput from '../services/user/dto/userOutput';
// import ILoginOutput from '../services/accountAuth/dto/loginOutput';
import userService from '../services/user/userService';

class UserStore {
  @observable currentLogin:IUserOutput = new CurrenUserLogin();

  
  @action
  async getUser(id: number) {
    let result = await userService.getCurrentLoginUser(id);
    this.currentLogin = result;
    console.log('current log in userStore', this.currentLogin);
    
    return result;
  }
}
export default UserStore;