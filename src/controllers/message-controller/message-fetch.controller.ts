import { RequestHandler, Request, Response } from 'express';
import { MessageModel } from 'src/models/message.model.ts/message.model';
import { ResponseBuilder } from '@shared/classes/ResponseBuilder';
import { INTERNAL_SERVER_ERROR } from 'http-status-codes';
import { K_ERR_MSGS } from '@shared/constants';


export const MessageListFetchController: RequestHandler = async (req: Request, res: Response) => {

    const page = +req.body['page'] || 0
    const per_page = 6

    try{
        const messages = await MessageModel.find({})
            .sort({createdAt: -1})
            .skip(per_page * page)
            .limit(per_page)
            .populate('user', ['_id', 'first_name', 'last_name'] )
            .populate({
                path: 'replies',
                populate: {
                    path: 'user',
                    select: ['_id', 'first_name', 'last_name']
                },
            }).exec()
        
            return new ResponseBuilder(res).success().setData(messages).res()
    }catch(e){
        return new ResponseBuilder(res, INTERNAL_SERVER_ERROR).error().message(K_ERR_MSGS.INTERNAL_SERVER_ERROR).res()
    }

}