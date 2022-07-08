export interface IRegisterData  {
  email: string
  fullName: string
  password: string
  avatarUrl: string
}

export interface IAuthServerResponse {
  email: string
  fullName: string
  avatarUrl: string
  token: string
}
