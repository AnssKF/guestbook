import { Document, Model } from "mongoose";

export interface IUserSchema extends Document {
    first_name: string,
    last_name: string,
    username: string,
    email: string,
    password: string,
}

export interface IUser extends IUserSchema {
    full_name: string
}

export interface IUserModel extends Model<IUser> {}

export type TUserLoginAPI = {
    username?: string,
    email?: string,
    password: string
}

