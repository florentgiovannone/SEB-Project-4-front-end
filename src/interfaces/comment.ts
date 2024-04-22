import { IUser } from "./user";
import { IPost } from "./post";
export interface IComment {
    id: string,
    content: string
    code: string
    comment_date: string
    post: IPost
    user: IUser

}