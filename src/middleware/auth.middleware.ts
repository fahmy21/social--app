import { NextFunction, Request, Response } from "express";
import { TokenService } from "../common/service/token.service";
import { Bad_Request_Exception } from "../common/excaptions/error.exceptions";


export interface userrequest extends Request{
    user?:any
}

let tokenService = new TokenService();

export const auth = (req: userrequest, res: Response, next: NextFunction) => {

    console.log(req.headers);

    if (req.headers.authorization) {

        let [flag, token] = req.headers.authorization.split(" ");

        let decodedData = tokenService.decodeToken(token as string);

        if (decodedData) {
            req.user=decodedData
            next();
        } else {
            throw new Bad_Request_Exception("token not valid");
        }

    } else {
        throw new Bad_Request_Exception("token not found");
    }
}