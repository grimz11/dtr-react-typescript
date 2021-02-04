export default interface IUserOutput{
  username: string
  name: string
  id: number
  blocked: boolean
  role: IRole
}

interface IRole{
  id: number
  name: string
  description: string
  type: string
}