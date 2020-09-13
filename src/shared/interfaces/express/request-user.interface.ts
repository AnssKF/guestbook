import { Request } from 'express';
import { IUserSchema } from '../user.interface';

export interface IRequestUser extends Request {
    user?: IUserSchema
}