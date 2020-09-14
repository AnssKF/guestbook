import { Request, Response, RequestHandler } from 'express';
import { CONFLICT, INTERNAL_SERVER_ERROR } from 'http-status-codes';

import { UserModel } from 'src/models/user-model/user.model';
import { IUserSchema } from '@shared/interfaces/user.interface';

import { ResponseBuilder } from '@shared/classes/ResponseBuilder'

import logger from '@shared/Logger';
import { K_ERR_MSGS } from '@shared/constants';
import jwt from 'jsonwebtoken'
import { IAccessTokenInterface } from '@shared/interfaces/access-token-payload.interface';

export const UserCreateController: RequestHandler = async (req: Request, res: Response) => {

    const body: IUserSchema = req.body
    
    try{

        const old_user = await UserModel.findOne({$or: [
            {username: body.username},
            {email: body.email}
        ]});
        if(old_user) 
            return new ResponseBuilder(res, CONFLICT).error().message('This Username/Email Exists Before.').res()

    }catch(e){
        logger.error(e)
        return new ResponseBuilder(res, INTERNAL_SERVER_ERROR).error().message(K_ERR_MSGS.INTERNAL_SERVER_ERROR).res()
    }

    try{
        const user = new UserModel(body);

        user.save((err: any, instance: IUserSchema) => {
            if(err) return new ResponseBuilder(res, INTERNAL_SERVER_ERROR).error().message(K_ERR_MSGS.INTERNAL_SERVER_ERROR).res()

            instance.password = '???'

            const payload: IAccessTokenInterface = {
                exp: Math.floor(Date.now() / 1000) + (60 * 60),
                data: instance.toObject()
            }
            const token = jwt.sign(payload, process.env.JWT_SECRET_KEY!)
            return new ResponseBuilder(res).success().setData({token}).res()
        })
        
    }catch(e) {
        logger.error(e);
        return new ResponseBuilder(res, INTERNAL_SERVER_ERROR).error().message(K_ERR_MSGS.INTERNAL_SERVER_ERROR).res()
    }

}