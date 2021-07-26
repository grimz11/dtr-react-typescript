import http from "../httpService";
import IRecordInput from "./dto/recordInput";
class RecordService {
  public async getRecord<T>(id: number): Promise<T> {
    const res = await http.get(
      `records?userId=${id}&_sort=created_at:desc&_limit=50`,
    );
    return res.data;
  }
  public async getUsersRecordsFilterByDate<T>(
    dateSelected: string,
  ): Promise<T> {
    const res = await http.get(`records?initialized_at=${dateSelected}`);
    return res.data;
  }
  public async getAllRecordsLimit<T>(): Promise<T> {
    const res = await http.get(`records?_sort=updated_at:desc&_limit=50`);
    return res.data;
  }
  public async clockIn<T>(payload: IRecordInput): Promise<T> {
    const res = await http.post("records", payload);
    return res.data;
  }
  public async clockOut<T>(id: number, payload: IRecordInput): Promise<T> {
    const res = await http.put(`records/${id}`, payload);
    return res.data;
  }
}

export default new RecordService();
