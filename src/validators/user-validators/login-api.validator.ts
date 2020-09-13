import Joi, { Schema } from 'joi'

export const LoginAPIValidatorSchema: Schema = Joi.object({
    username: Joi.string()
                    .alphanum()
                    .min(3)
                    .max(30),
    email: Joi.string()
                    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    password: Joi.string()
                    .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
}) .or('username', 'email')