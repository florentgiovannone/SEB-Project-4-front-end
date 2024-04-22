import { IUser } from "./user";
import { IComment } from "./comment"
import { ILike } from "./like"

export interface IPost {
    id: string,
    title: string,
    content: string,
    image: string,
    email: string,
    category: string,
    code: string,
    user: IUser
    post_date: string
    comment: Array <IComment>
    like: Array <ILike>
}