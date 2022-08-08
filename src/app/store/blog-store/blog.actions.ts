import { createAction, props } from "@ngrx/store";
import { IPost } from "src/app/blog/post.interface";

export const getPost = createAction('[Blog] get post', props<{id: string}>())
export const getPostSuccess = createAction('[Blog] get post success', props<IPost>())
export const getPostFailure = createAction('[Blog] get post failure', props<{serverError: string}>())

