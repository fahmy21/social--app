import { Types } from "mongoose";

export interface IFriend {
    userId: Types.ObjectId;
    friendId: Types.ObjectId;
    createdAt?: Date;
    updatedAt?: Date;
}