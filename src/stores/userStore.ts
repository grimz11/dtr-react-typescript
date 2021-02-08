import { action, observable } from 'mobx';
import CurrentUserLogin from '../services/accountAuth/dto/currentUserLogin';
import IUserOutput from '../services/user/dto/userOutput';
// import ILoginOutput from '../services/accountAuth/dto/loginOutput';
import userService from '../services/user/userService';

class UserStore {
  @observable currentLogin:any = new CurrentUserLogin();
  @observable allUsers:[] = [];
  
  @action
  async getUser(id: number) {
    let result = await userService.getCurrentLoginUser(id);
    this.currentLogin = result;
    return result;
  }

  @action
  async getAllUsers() {
    let result = await userService.getAllUsers();
    this.allUsers = result;
    return result;
  }
}
export default UserStore;