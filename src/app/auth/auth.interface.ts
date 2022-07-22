export interface IRegisterData  {
  email: string
  fullName: string
  password: string
  avatarUrl: string
}

export interface IUserData  {
  email: string
  id: string
  fullName: string
  avatarUrl: string
}

export interface IAuthServerResponse {
  accessToken: string
  refreshToken: string
  user: IUserData
  // data from decoded token
  id: string
  email: string
  iat: number
  exp: number
}

export interface ILoginData {
  email: string
  password: string
}

export interface IAuthState {
  loading: boolean
  loaded: boolean
  serverError: string
  serverResponse?: IAuthServerResponse
}
