import Joi, { Schema } from 'joi'

export const MessageReplyAPIValidatorSchema: Schema = Joi.object({
    text: Joi.string()
                    .min(3)
                    .required()
})