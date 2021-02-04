import IUserOutput from "../../user/dto/userOutput";

export default interface IRecordInput {
  created_at?: any;
  updated_at?: any;
  timeOut?: any;
  hoursOfTheDay?: number;
  userId?: IUserOutput
}
