import { Request, Response, RequestHandler } from 'express';
import { CONFLICT, INTERNAL_SERVER_ERROR } from 'http-status-codes';

import { UserModel } from 'src/models/user-model/user.model';
import { IUserSchema } from 'src/models/user-model/user.interface';

import { UserValidatorSchema } from 'src/validators/user.validator';
import { ValidationErrorItem } from 'joi';

import logger from '@shared/Logger';
import { K_ERR_MSGS } from '@shared/constants';

export const UserCreateController: RequestHandler = async (req: Request, res: Response) => {

    const body: IUserSchema = req.body
    
    try{

        const old_user = await UserModel.findOne({'username': body.username});
        if(old_user) 
            return res.status(CONFLICT).json({'status': 'error', 'msg': 'This Username Exists Before.'});

    }catch(e){
        logger.error(e)
        return res.status(INTERNAL_SERVER_ERROR).json({'status': 'error', 'msg': K_ERR_MSGS.INTERNAL_SERVER_ERROR});
    }

    try{
        const user = new UserModel(body);

        user.save((err, instance) => {
            if(err) return res.status(INTERNAL_SERVER_ERROR).json({'status': 'error', 'msg': K_ERR_MSGS.INTERNAL_SERVER_ERROR});
            
            delete instance['password']
            return res.json({'status': 'success', 'data': instance});
        })
        
    }catch(e) {
        logger.error(e);
        return res.status(INTERNAL_SERVER_ERROR).json({'status': 'error', 'msg': K_ERR_MSGS.INTERNAL_SERVER_ERROR});
    }

}