import { Request, Response, RequestHandler } from 'express';
import { CONFLICT, INTERNAL_SERVER_ERROR } from 'http-status-codes';

import { UserModel } from 'src/models/user-model/user.model';
import { IUserSchema } from 'src/models/user-model/user.interface';

import { ResponseBuilder } from '@shared/ResponseBuilder'

import logger from '@shared/Logger';
import { K_ERR_MSGS } from '@shared/constants';

export const UserCreateController: RequestHandler = async (req: Request, res: Response) => {

    const body: IUserSchema = req.body
    
    try{

        const old_user = await UserModel.findOne({'username': body.username});
        if(old_user) 
            return new ResponseBuilder(res, CONFLICT).error().message('This Username Exists Before.').res()

    }catch(e){
        logger.error(e)
        return new ResponseBuilder(res, INTERNAL_SERVER_ERROR).error().message(K_ERR_MSGS.INTERNAL_SERVER_ERROR).res()
    }

    try{
        const user = new UserModel(body);

        user.save((err, instance) => {
            if(err) return new ResponseBuilder(res, INTERNAL_SERVER_ERROR).error().message(K_ERR_MSGS.INTERNAL_SERVER_ERROR).res()

            instance.password = '???'
            return new ResponseBuilder(res).success().setData(instance).res()
        })
        
    }catch(e) {
        logger.error(e);
        return new ResponseBuilder(res, INTERNAL_SERVER_ERROR).error().message(K_ERR_MSGS.INTERNAL_SERVER_ERROR).res()
    }

}