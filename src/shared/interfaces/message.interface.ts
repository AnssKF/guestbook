import { IUserSchema } from './user.interface';
import { Model, Document } from 'mongoose';

export interface IReply {
    user: IUserSchema,
    text: string
}

export interface IMessageSchema extends Document {
    user: IUserSchema
    title: string,
    content: string,
    replies: IReply[],
    created_at: Date
}