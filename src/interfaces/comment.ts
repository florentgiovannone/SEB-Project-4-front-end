import { IUser } from "./user";

export interface IComment {
    id: string,
    content: string,
    user: IUser
}