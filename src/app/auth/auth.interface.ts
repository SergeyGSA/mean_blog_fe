export interface IRegisterData  {
  email: string
  fullName: string
  password: string
  avatarUrl: string
}

export interface IServerResponseUserData {
  email: string
  id: string
}
export interface IAuthServerResponse {
  accessToken: string
  refreshToken: string
  user: IServerResponseUserData
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
