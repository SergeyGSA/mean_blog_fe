export interface IPost {
  title: string
  imageUrl: string
  text: string
  tags: Array<string>
  user: any
  viewsCount: number
  updatedAt: Date
  createdAt: Date
}

export interface IBlogState {
  loaded: boolean
  loading: boolean
  serverError: string
}