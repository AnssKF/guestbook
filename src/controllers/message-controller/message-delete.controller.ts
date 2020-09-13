import { RequestHandler, Response } from 'express';
import { IRequestUser } from '@shared/interfaces/express/request-user.interface';
import { MessageModel } from 'src/models/message.model.ts/message.model';
import { NOT_FOUND, INTERNAL_SERVER_ERROR } from 'http-status-codes';
import { ResponseBuilder } from '@shared/classes/ResponseBuilder';
import { K_ERR_MSGS } from '@shared/constants';


export const MessageDeleteController: RequestHandler = async (req: IRequestUser, res: Response) => {
    const message_id = req.params.id
    const user = req.user

    try {
        const message = await MessageModel.findOneAndDelete({_id: message_id, user: user})
        
        if(!message) new ResponseBuilder(res, NOT_FOUND).error().message('Invalid Message ID').res()

        return new ResponseBuilder(res).success().setData(message).res()
    }catch(e){
        return new ResponseBuilder(res, INTERNAL_SERVER_ERROR).error().message(K_ERR_MSGS.INTERNAL_SERVER_ERROR).res()
    }

}