import { Response, RequestHandler } from 'express';
import { IRequestUser } from '@shared/interfaces/express/request-user.interface';
import { INTERNAL_SERVER_ERROR } from 'http-status-codes';
import { ResponseBuilder } from '@shared/classes/ResponseBuilder';

import { IMessageSchema } from '@shared/interfaces/message.interface';
import { MessageModel } from 'src/models/message.model.ts/message.model';
import { K_ERR_MSGS } from '@shared/constants';

export const MessageCreateController: RequestHandler = async (req: IRequestUser, res: Response) => {

    const body: IMessageSchema = req.body
    
    try{
        const message = new MessageModel({
            user: req.user,
            title: body.title,
            content: body.content,
            replies: [],
        })

        message.save((err: any, instance: IMessageSchema) => {
            if(err) return new ResponseBuilder(res, INTERNAL_SERVER_ERROR).error().message(K_ERR_MSGS.INTERNAL_SERVER_ERROR).res()

            instance.user.password = '???'
            return new ResponseBuilder(res).success().setData(instance).res()
        })
    }catch(e){
        return new ResponseBuilder(res, INTERNAL_SERVER_ERROR).error().message(K_ERR_MSGS.INTERNAL_SERVER_ERROR).res()
    }

}