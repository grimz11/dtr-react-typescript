import http from "../httpService";
import AppConsts from "../../utils/appconst";

class UserService {
  public async getCurrentLoginUser(id: number): Promise<any> {
    const res = await http.get(`${AppConsts.appBaseUrl}/users/${id}`);

    return res.data;
  }
  public async getUserProfile(id: number): Promise<any> {
    const res = await http.get(`${AppConsts.appBaseUrl}/users/${id}`);

    return res.data;
  }
  public async getAllUsers(): Promise<any> {
    const res = await http.get(`${AppConsts.appBaseUrl}/users`);

    return res.data;
  }
  public async updateUser(id: number, payload: any): Promise<any> {
    // const {} = payload;
    const res = await http.put(`${AppConsts.appBaseUrl}/users/${id}`, {
      ...payload,
    });
    return res.data;
  }
  public async uploadImage(formData: any): Promise<any> {
    // const {} = payload;
    console.log("userService", ...formData);

    const res = await http.post(`${AppConsts.appBaseUrl}/users`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  }
}

export default new UserService();
