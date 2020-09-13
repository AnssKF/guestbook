import { RequestHandler, Request, Response } from 'express';
import { INTERNAL_SERVER_ERROR, NOT_FOUND, BAD_REQUEST } from 'http-status-codes';

import { UserModel } from 'src/models/user-model/user.model';
import { IUser } from '@shared/interfaces/user.interface';

import { K_ERR_MSGS } from '@shared/constants';
import logger from '@shared/Logger';

import { TUserLoginAPI } from '@shared/interfaces/user.interface';
import { ResponseBuilder } from '@shared/classes/ResponseBuilder';

import jwt from 'jsonwebtoken'
import { compare } from 'bcrypt';
import { IAccessTokenInterface } from '@shared/interfaces/access-token-payload.interface';


export const UserLoginController: RequestHandler = async (req: Request, res: Response) => {

    const body: TUserLoginAPI = req.body;

    try{
        const old_user: IUser | null = await UserModel.findOne({
            $or: [
                {username: body.username},
                {email: body.email}
            ]
        })
        
        if(!old_user) return new ResponseBuilder(res, NOT_FOUND).error().message('User with this email or username is not exist.').res()

        const password_validate = await compare(body.password, old_user.password)

        if(!password_validate) return new ResponseBuilder(res, BAD_REQUEST).error().message('Wrong Password or Username.').res()

        old_user.password = '???'
        const payload: IAccessTokenInterface = {
            exp: Math.floor(Date.now() / 1000) + (60 * 60),
            data: old_user.toObject()
        }
        const token = jwt.sign(payload, process.env.JWT_SECRET_KEY!)
        return new ResponseBuilder(res).success().setData({token}).res()

    }catch(e) {
        console.log(e);
        logger.error(e)
        return new ResponseBuilder(res, INTERNAL_SERVER_ERROR).error().message(K_ERR_MSGS.INTERNAL_SERVER_ERROR).res()
    }

}