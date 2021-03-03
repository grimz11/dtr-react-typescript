import IRecordInput from "../../record/dto/recordInput";
import IUserOutput from "./userOutput";

export default interface IUsersRecord {
  record: IRecordInput;
  userId: IUserOutput;
}
