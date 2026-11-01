import { Types } from "mongoose";

export interface IFriendRequest {
    senderId: Types.ObjectId;
    receiverId: Types.ObjectId;
    status: "pending" | "accepted" | "rejected";
    createdAt?: Date;
    updatedAt?: Date;
}