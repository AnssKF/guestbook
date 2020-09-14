import { RequestHandler, Request, Response, NextFunction } from 'express';
import { IRequestUser } from './interfaces/express/request-user.interface';
import { BAD_REQUEST, UNAUTHORIZED, INTERNAL_SERVER_ERROR, NOT_FOUND } from 'http-status-codes';

import { Schema, ValidationErrorItem } from 'joi';
import jwt from 'jsonwebtoken'

import { ResponseBuilder } from './classes/ResponseBuilder';

import { UserModel } from 'src/models/user-model/user.model';
import { K_ERR_MSGS } from './constants';
import { IAccessTokenInterface } from './interfaces/access-token-payload.interface';

export const JoiValidatorMiddleware = (joiSchema: Schema): RequestHandler => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const body = req.body
        try{
            const validated_data = await joiSchema.validateAsync(body)
            req.body = validated_data
            next()
        }catch(e){
            const errors = e.details.map((err: ValidationErrorItem) => ({message: err.message}))
            return new ResponseBuilder(res, BAD_REQUEST).error().setData(errors).res()
        }
    }
}

export const IsLoggedInMiddleware: RequestHandler = async (req: IRequestUser, res: Response, next: NextFunction) => {
    
    const access_token = req.headers['authorization'] || null
    
    if(!access_token) return new ResponseBuilder(res, UNAUTHORIZED).error().message('You are not authurized, Please login first.').res()

    try {
        const payload: IAccessTokenInterface = jwt.verify(access_token, process.env.JWT_SECRET_KEY!) as IAccessTokenInterface
        
        try {
            const user = await UserModel.findById(payload.data['_id'])
            
            if(!user) return new ResponseBuilder(res, NOT_FOUND).error().message('Invalid Access Token, Please login again.').res()

            req.user = user
            next()

        }catch(e) {
            return new ResponseBuilder(res, INTERNAL_SERVER_ERROR).error().message(K_ERR_MSGS.INTERNAL_SERVER_ERROR).res()
        }
        
    }catch(e){
        return new ResponseBuilder(res, UNAUTHORIZED).error().message('Invalid Access Token, Please login again.').res()
    }

}