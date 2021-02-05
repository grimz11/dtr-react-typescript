import recordService from '../services/record/recordService';
import { action, observable } from "mobx";
import IRecordInput from '../services/record/dto/recordInput';

class RecordStore{
  @observable currentLogin:string = "";
  @observable records:[] = [];

  @action
  async getRecord(id:number) {
    const res = await recordService.getRecord(id);
    this.records = res;
    
    return res;
  }
  async getAllRecords() {
    const res = await recordService.getAllRecords();
    this.records = res;
    return res;
  }
  @action
  async timeIn(payload: IRecordInput) {
    await recordService.timeIn(payload);
  }
  @action
  async timeOut(id:number, payload: IRecordInput) {
    await recordService.timeOut(id, payload);
  }
}

export default RecordStore;