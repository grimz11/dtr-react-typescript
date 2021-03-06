import http from "../httpService";
import AppConsts from "../../utils/appconst";

class UserService {
  public async getCurrentLoginUser<T>(id: number): Promise<T> {
    const res = await http.get(`${AppConsts.appBaseUrl}/users/${id}`);

    return res.data;
  }
  public async getUserProfile<T>(id: number): Promise<T> {
    const res = await http.get(`${AppConsts.appBaseUrl}/users/${id}`);

    return res.data;
  }
  public async getAllUsers<T>(): Promise<T> {
    const res = await http.get(`${AppConsts.appBaseUrl}/users`);

    return res.data;
  }
  public async updateUser(id: number, payload: any): Promise<any> {
    const res = await http.put(`${AppConsts.appBaseUrl}/users/${id}`, {
      ...payload,
    });
    return res.data;
  }
  public async uploadImage(formData: any): Promise<any> {
    const res = await http.post(`${AppConsts.appBaseUrl}/upload`, formData);
    return res.data;
  }
}

export default new UserService();
