export default interface IUserOutput {
  username: string;
  name: string;
  firstname: string;
  lastname: string;
  id: number;
  blocked: boolean;
  role?: IRole;
  avatar: any;
  address: string;
  birthday: Date;
  quotes: string;
  department: string;
  email: string;
  phoneNumber: string;
}

interface IRole {
  id?: number;
  firstname?: string;
  lastname?: string;
  description?: string;
  type?: string;
}
