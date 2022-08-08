export interface IRegisterData  {
  email: string | undefined
  fullName: string | undefined
  password: string | undefined
  avatarUrl: string | undefined
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
  email: string | undefined
  password: string | undefined
}

export interface IAuthState {
  loading: boolean
  loaded: boolean
  serverError: string
  serverResponse?: IAuthServerResponse
}
