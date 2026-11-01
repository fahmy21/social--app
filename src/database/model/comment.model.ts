import mongoose, { Types } from "mongoose";
import { IComment } from "../../common/interfaces/comment.interface";

const commentSchema = new mongoose.Schema<IComment>(
    {
        userId: {
            type: Types.ObjectId,
            ref: "User",
            required: true
        },

        postId: {
            type: Types.ObjectId,
            ref: "Post",
            required: true
        },

        content: {
            type: String,
            required: true,
            trim: true
        }
    },
    {
        timestamps: true,
        strict: true
    }
);

export const commentModel =
    mongoose.model<IComment>("Comment", commentSchema);