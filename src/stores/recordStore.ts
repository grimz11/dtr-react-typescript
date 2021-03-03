import recordService from "../services/record/recordService";
import { makeAutoObservable } from "mobx";
import IRecordInput from "../services/record/dto/recordInput";
import IUsersRecord from "../services/user/dto/userRecord";

class RecordStore {
  $currentLogin: string = "";
  $personRecords: Array<IUsersRecord> = [];
  $peopleRecords: Array<IUsersRecord> = [];

  constructor() {
    makeAutoObservable(this);
  }

  async getRecord(id: number): Promise<void> {
    const res = await recordService.getRecord(id);
    this.$personRecords = res;
  }

  async getAllRecords(): Promise<void> {
    const res = await recordService.getAllRecords();
    this.$peopleRecords = res;
  }

  async getAllRecordsLimit(): Promise<void> {
    const res = await recordService.getAllRecordsLimit();
    this.$peopleRecords = res;
  }

  async timeIn(payload: IRecordInput): Promise<void> {
    await recordService.timeIn(payload);
  }

  async timeOut(id: number, payload: IRecordInput): Promise<void> {
    await recordService.timeOut(id, payload);
  }
}

export default RecordStore;
