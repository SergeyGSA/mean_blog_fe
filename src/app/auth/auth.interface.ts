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
