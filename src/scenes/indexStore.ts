import RecordStore from "../stores/recordStore";
import UserStore from "../stores/userStore";

export default interface IHomeRecordStore {
    recordStore: RecordStore;
    userStore: UserStore;
}