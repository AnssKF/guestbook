import { Response } from "express";

interface IJSONResponse {
    status: 'success' | 'error',
    data?: any,
    message?: string
}

export class ResponseBuilder {

    private _json: IJSONResponse = {
        status: 'success'
    };

    constructor(private _res: Response, private _status: number = 200){
    }

    success(){
        this._json.status = 'success';
        return this;
    }
    
    error(){
        this._json.status = 'error';
        return this;
    }

    setData(data: any){
        this._json.data = data;
        return this;
    }

    message(msg: string){
        this._json.message = msg;
        return this;
    }

    status(code: number) {
        this._status = code;
        return this;
    }

    res() {
        this._res.status(this._status).json(this._json)
    }

    json() {
        return this._json
    }
}