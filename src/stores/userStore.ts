import { makeAutoObservable } from "mobx";
import CurrentUserLogin from "../services/accountAuth/dto/currentUserLogin";
import IUserOutput from "../services/user/dto/userOutput";
import userService from "../services/user/userService";

class UserStore {
  $currentLogin: IUserOutput = new CurrentUserLogin().user;
  $allUsers: Array<IUserOutput> = [];
  $userProfile: Array<IUserOutput> = [];

  constructor() {
    makeAutoObservable(this);
  }

  async getCurrentLoginUser(id: number): Promise<void> {
    let result = await userService.getCurrentLoginUser<IUserOutput>(id);
    this.$currentLogin = result;
  }

  async getUserProfile(id: number): Promise<void> {
    let result = await userService.getUserProfile<Array<IUserOutput>>(id);
    this.$userProfile = result;
  }

  async getAllUsers(): Promise<void> {
    let result = await userService.getAllUsers<Array<IUserOutput>>();
    this.$allUsers = result;
  }

  async updateUser(id: number, payload: any): Promise<any> {
    let result = await userService.updateUser(id, payload);
    return result;
  }

  async uploadImage(formData: any): Promise<any> {
    let result = await userService.uploadImage(formData);
    return result;
  }
}
export default UserStore;
