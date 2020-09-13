import { RequestHandler, Request, Response, NextFunction } from 'express';
import { BAD_REQUEST } from 'http-status-codes';
import { Schema, ValidationErrorItem } from 'joi';
import { ResponseBuilder } from './ResponseBuilder';

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