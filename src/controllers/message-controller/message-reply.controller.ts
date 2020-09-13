import { RequestHandler, Response } from 'express';
import { IRequestUser } from '@shared/interfaces/express/request-user.interface';
import { ResponseBuilder } from '@shared/classes/ResponseBuilder';
import { INTERNAL_SERVER_ERROR } from 'http-status-codes';

import { MessageModel } from 'src/models/message.model.ts/message.model';
import { IMessageSchema } from '@shared/interfaces/message.interface'
import { K_ERR_MSGS } from '@shared/constants';

export const MessageReplyController: RequestHandler = async (req: IRequestUser, res: Response) => {
    
    const message_id = req.params.id
    const reply = req.body.text
    const user = req.user!

    try{

        const message = await MessageModel.findById(message_id);

        message?.replies.push({
            user: user._id,
            text: reply
        });

        const instance = await (await message?.save()!)
        .populate({
            path: 'user',
            select: ['_id', 'first_name', 'last_name']
        })
        .populate({
            path: 'replies',
            populate: {
                path: 'user',
                select: ['_id', 'first_name', 'last_name']
            }
        }).execPopulate()

        return new ResponseBuilder(res).success().setData(instance).res()

    }catch(e) {
        return new ResponseBuilder(res, INTERNAL_SERVER_ERROR).error().message(K_ERR_MSGS.INTERNAL_SERVER_ERROR).res()
    }

}