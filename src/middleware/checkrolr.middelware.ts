import { NextFunction, Request, Response } from "express";
import { IUser } from "../common";
import userModel from "../database/model/user.model";


import { DatabaseRepository } from "../database/reposatory/database.reposatory";
import { Bad_Request_Exception } from "../common/excaptions/error.exceptions";
import { userrequest } from "./auth.middleware";

let userRepository = new DatabaseRepository<IUser>(userModel);

export const checkRole = (roles: string[]) => {
    return async (
        req: userrequest,
        res: Response,
        next: NextFunction
    ) => {

        let userData = await userRepository.Find_By_Id({
            id: req.user.id
        });

        if (!userData) {
            throw new Bad_Request_Exception("user not found");
        }

        if (roles.includes(userData.role)) {
            next();
        } else {
            throw new Bad_Request_Exception("unauthorized");
        }
    };
};