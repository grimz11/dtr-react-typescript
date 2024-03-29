import recordService from "../services/record/recordService";
import { makeAutoObservable } from "mobx";
import IRecordInput from "../services/record/dto/recordInput";
import IUsersRecord from "../services/user/dto/userRecord";

class RecordStore {
  $currentLogin: string = "";
  $personRecords: Array<IUsersRecord> = [];
  $peopleRecords: Array<IUsersRecord> = [];
  $personDataFilterByDate: Array<IUsersRecord> = [];

  constructor() {
    makeAutoObservable(this);
  }

  async getRecord(id: number): Promise<void> {
    const res = await recordService.getRecord<Array<IUsersRecord>>(id);
    this.$personRecords = res;
  }

  async getUsersRecordsFilterByDate(dateSelected: string): Promise<void> {
    const res = await recordService.getUsersRecordsFilterByDate<
      Array<IUsersRecord>
    >(dateSelected);
    this.$personDataFilterByDate = res;
  }

  async getAllRecordsLimit(): Promise<void> {
    const res = await recordService.getAllRecordsLimit<Array<IUsersRecord>>();
    this.$peopleRecords = res;
  }

  async clockIn(payload: IRecordInput): Promise<void> {
    await recordService.clockIn<IRecordInput>(payload);
  }

  async clockOut(id: number, payload: IRecordInput): Promise<void> {
    await recordService.clockOut<IRecordInput>(id, payload);
  }
}

export default RecordStore;
