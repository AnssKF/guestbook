import { model, Schema, Model } from "mongoose";
import { IMessageSchema, IReply } from '@shared/interfaces/message.interface';

const ReplySchema = new Schema<IReply>({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    message: {
        type: String,
        required: true
    }
})

const MessageSchema = new Schema<IMessageSchema>({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    replies: [ReplySchema],
},{
    timestamps: true
})

export const MessageModel: Model<IMessageSchema> = model<IMessageSchema, Model<IMessageSchema>>('Message', MessageSchema);