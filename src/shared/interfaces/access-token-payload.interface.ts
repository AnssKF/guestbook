import { IUserSchema } from './user.interface';

export interface IAccessTokenInterface {
    exp: number,
    data: IUserSchema,
    iat?: number
}