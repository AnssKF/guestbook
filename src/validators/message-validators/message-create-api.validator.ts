import Joi, { Schema } from 'joi'

export const MessageCreateAPIValidatorSchema: Schema = Joi.object({
    title: Joi.string()
                    .min(10)
                    .max(30)
                    .required(),
    content: Joi.string()
                    .min(10)
                    .required(),
    user: Joi.object()
})