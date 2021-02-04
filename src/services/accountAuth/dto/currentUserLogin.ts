import IUserOutput from "../../user/dto/userOutput";

export default class CurrenUserLogin {
  jwt!: string;
  user?: IUserOutput;
  id!: number;
}
