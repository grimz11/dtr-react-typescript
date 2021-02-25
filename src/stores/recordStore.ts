import recordService from "../services/record/recordService";
import { action, makeAutoObservable, observable } from "mobx";
import IRecordInput from "../services/record/dto/recordInput";

class RecordStore {
  $currentLogin: string = "";
  $personRecords: [] = [];
  $peopleRecords: [] = [];

  constructor() {
    makeAutoObservable(this);
  }

  async getRecord(id: number) {
    const res = await recordService.getRecord(id);
    this.$personRecords = res;

    return res;
  }

  async getAllRecords() {
    const res = await recordService.getAllRecords();
    this.$peopleRecords = res;
    return res;
  }

  async getAllRecordsLimit() {
    const res = await recordService.getAllRecordsLimit();
    this.$peopleRecords = res;
    return res;
  }

  async timeIn(payload: IRecordInput) {
    await recordService.timeIn(payload);
  }

  async timeOut(id: number, payload: IRecordInput) {
    await recordService.timeOut(id, payload);
  }
}

export default RecordStore;
