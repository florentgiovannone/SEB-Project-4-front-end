import { IUser } from "./user";

export interface IComment {
    id: string,
    content: string,
    code: string
    user: IUser
    comment_date: string
}