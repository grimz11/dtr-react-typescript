import IUserOutput from "../../user/dto/userOutput";

export default interface IRecordInput {
  created_at?: any;
  updated_at?: any;
  timeOut: any;
  hoursRendered: string;
  currentlyWorking: boolean;
  userId: IUserOutput;
  id?: number;
  published_at?: any;
  initialized_at?: string;
}
