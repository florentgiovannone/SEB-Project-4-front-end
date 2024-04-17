import { IUser } from "./user";
import { IComment } from "./comment"

export interface IPost {
    id: string,
    title: string,
    content: string,
    image: string,
    email: string,
    category: string,
    code: string,
    user: IUser
    comment: Array <IComment>
}