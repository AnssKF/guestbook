import Joi, { Schema } from 'joi'
import { IUser } from '@shared/interfaces/user.interface'

export const UserValidatorSchema: Schema = Joi.object<IUser>({
    first_name: Joi.string()
                    .alphanum()
                    .min(3)
                    .max(30)
                    .required(),
    last_name: Joi.string()
                    .alphanum()
                    .min(3)
                    .max(30)
                    .required(),
    username: Joi.string()
                    .alphanum()
                    .min(3)
                    .max(30)
                    .required(),
    email: Joi.string()
                    .required()
                    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    password: Joi.string()
                    .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
})