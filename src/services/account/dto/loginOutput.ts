import IUserOutput from "../../user/dto/userOutput";

export default interface ILoginOutput {
  jwt: string;
  user?: IUserOutput;
}
