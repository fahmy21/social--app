import mongoose, { Types } from "mongoose";

const friendSchema = new mongoose.Schema(
    {
        userId: {
            type: Types.ObjectId,
            ref: "user",
            required: true
        },

        friendId: {
            type: Types.ObjectId,
            ref: "user",
            required: true
        }
    },
    {
        timestamps: true
    }
);

export const friendModel = mongoose.model("Friend", friendSchema);