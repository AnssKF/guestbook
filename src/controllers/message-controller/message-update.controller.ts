import { Response, RequestHandler } from 'express'
import { IRequestUser } from '@shared/interfaces/express/request-user.interface'
import { MessageModel } from 'src/models/message.model.ts/message.model'
import { ResponseBuilder } from '@shared/classes/ResponseBuilder'
import { INTERNAL_SERVER_ERROR, NOT_FOUND } from 'http-status-codes'
import { K_ERR_MSGS } from '@shared/constants'

export const MessageUpdateController: RequestHandler = async (req: IRequestUser, res: Response) => {

    const message_id = req.params.id
    const update_data = req.body
    const user = req.user!

    try{

        const message = await MessageModel.findByIdAndUpdate({_id: message_id, user: user}, {
            $set: update_data
        }, {
            new: true
        })
        
        const instance = await message?.populate({
            path: 'user',
            select: ['_id', 'first_name', 'last_name']
        }).populate({
            path: 'replies',
            populate: {
                path: 'user',
                select: ['_id', 'first_name', 'last_name']
            }
        }).execPopulate()

        return new ResponseBuilder(res).success().setData(instance).res()
    }catch(e){
        return new ResponseBuilder(res, INTERNAL_SERVER_ERROR).error().message(K_ERR_MSGS.INTERNAL_SERVER_ERROR).res()
    }

}