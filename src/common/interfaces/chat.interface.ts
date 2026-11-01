import { Types } from "mongoose";
import { IUser } from "./user.interface";
import { Chat_Enum } from "../enums/chat.enums";



export interface IMessage {
    content: string;
    attachments?: string[];
    likes?: Types.ObjectId[] | IUser[];
    tags?: Types.ObjectId[] | IUser[];
    createdBy: Types.ObjectId | IUser;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date | null;
    restoredAt?: Date | null;
}
export interface IChat {
    participants: Types.ObjectId[] | IUser[];
    createBy: Types.ObjectId | IUser;
    type: Chat_Enum;
    message: IMessage[];

    group?: string;
    groupImage?: string;

    roomId?: string;

    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date | null;
    restoredAt?: Date | null;
}