import mongoose, { Types } from "mongoose";
import { IFriendRequest } from "../../common/interfaces/friendRequest.interface";

const friendRequestSchema = new mongoose.Schema<IFriendRequest>(
    {
        senderId: {
            type: Types.ObjectId,
            ref: "user",
            required: true
        },

        receiverId: {
            type: Types.ObjectId,
            ref: "user",
            required: true
        },

        status: {
            type: String,
            enum: ["pending", "accepted", "rejected"],
            default: "pending"
        }
    },
    {
        timestamps: true
    }
);

export const friendRequestModel =
    mongoose.model<IFriendRequest>(
        "FriendRequest",
        friendRequestSchema
    );