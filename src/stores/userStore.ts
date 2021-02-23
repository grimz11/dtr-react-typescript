import { makeAutoObservable } from "mobx";
import CurrentUserLogin from "../services/accountAuth/dto/currentUserLogin";
// import IUserOutput from "../services/user/dto/userOutput";
// import ILoginOutput from '../services/accountAuth/dto/loginOutput';
import userService from "../services/user/userService";

class UserStore {
  $currentLogin: any = new CurrentUserLogin();
  $allUsers: [] = [];
  $userProfile: [] = [];
  $userProfileEditable: [] = [];

  constructor() {
    makeAutoObservable(this);
  }

  async getCurrentLoginUser(id: number) {
    let result = await userService.getCurrentLoginUser(id);
    this.$currentLogin = result;
    return result;
  }

  async getUserProfile(id: number) {
    let result = await userService.getUserProfile(id);
    this.$userProfile = result;
    return result;
  }

  async getAllUsers() {
    let result = await userService.getAllUsers();
    this.$allUsers = result;
    return result;
  }

  async updateUser(id: number, payload: any) {
    let result = await userService.updateUser(id, payload);
    return result;
  }

  async uploadImage(formData: any) {
    let result = await userService.uploadImage(formData);
    return result;
  }
}
export default UserStore;
