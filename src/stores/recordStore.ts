import recordService from "../services/record/recordService";
import { action, observable } from "mobx";
import IRecordInput from "../services/record/dto/recordInput";

class RecordStore {
  @observable currentLogin: string = "";
  @observable personRecords: [] = [];
  @observable peopleRecords: [] = [];

  // @action
  // async getRecord(id:number) {
  //   const res = await recordService.getRecord(id);
  //   this.personRecords = res;

  //   return res;
  // }

  @action
  async getRecord(id: number) {
    const res = await recordService.getRecord(id);
    this.personRecords = res;
    console.log("personRecord", res);

    return res;
  }

  @action
  async getAllRecords() {
    const res = await recordService.getAllRecords();
    this.peopleRecords = res;
    return res;
  }

  @action
  async getAllRecordsLimit() {
    const res = await recordService.getAllRecordsLimit();
    this.peopleRecords = res;
    return res;
  }
  @action
  async timeIn(payload: IRecordInput) {
    await recordService.timeIn(payload);
  }
  @action
  async timeOut(id: number, payload: IRecordInput) {
    await recordService.timeOut(id, payload);
  }
}

export default RecordStore;
