import { action, observable } from 'mobx';
import CurrentUserLogin from '../services/accountAuth/dto/currentUserLogin';
import IUserOutput from '../services/user/dto/userOutput';
// import ILoginOutput from '../services/accountAuth/dto/loginOutput';
import userService from '../services/user/userService';

class UserStore {
  @observable currentLogin:any = new CurrentUserLogin();
  @observable allUsers:[] = [];
  @observable userProfile:[] = [];

  @action
  async getCurrentLoginUser(id: number) {
    let result = await userService.getCurrentLoginUser(id);
    this.currentLogin = result;
    return result;
  }
  @action
  async getUserProfile(id: number) {
    let result = await userService.getUserProfile(id);
    this.userProfile = result;
    return result;
  }

  @action
  async getAllUsers() {
    let result = await userService.getAllUsers();
    this.allUsers = result;
    return result;
  }

  @action
  async updateUser(id:number, payload:any){
    let result = await userService.updateUser(id, payload);
    return result;
  }
  @action
  async uploadImage(formData: any){
    console.log('uploadImage', ...formData);
    
    let result = await userService.uploadImage(formData);
    return result;
  }
}
export default UserStore;