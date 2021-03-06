import http from "../httpService";
import IRecordInput from "./dto/recordInput";

class RecordService {
  public async getRecord<T>(id: number): Promise<T> {
    const res = await http.get(`records?userId=${id}`);
    return res.data;
  }
  public async getAllRecords<T>(): Promise<T> {
    const res = await http.get("records");
    return res.data;
  }
  public async getAllRecordsLimit<T>(): Promise<T> {
    const res = await http.get(`records?_sort=updated_at:desc&_limit=50`);
    return res.data;
  }
  public async timeIn<T>(payload: IRecordInput): Promise<T> {
    const res = await http.post("records", payload);
    return res.data;
  }
  public async timeOut<T>(id: number, payload: IRecordInput): Promise<T> {
    const res = await http.put(`records/${id}`, payload);
    return res.data;
  }
}

export default new RecordService();
