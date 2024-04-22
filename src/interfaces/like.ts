import { IUser } from "./user";
import { IPost } from "./post";
export interface ILike {
    id: string,
    post: IPost
    user: IUser
}