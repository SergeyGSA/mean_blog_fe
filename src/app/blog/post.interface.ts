import {IUserData} from '../auth/auth.interface'

export interface IPost {
  title: string
  imageUrl: string
  text: string
  tags: Array<string>
  user: IUserData
  viewsCount: number
  updatedAt: Date
  createdAt: Date
}

export interface IBlogState {
  loaded: boolean
  loading: boolean
  serverError: string
  serverResponse: IPost | IPost[] | null
}
