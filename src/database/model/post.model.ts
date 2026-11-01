import mongoose, { Types } from "mongoose";
import { IPost } from "../../common/interfaces/post.interface";




const postSchema = new mongoose.Schema<IPost>({
    title: { type: String, required: true },
    content: { type: String, required: true },
    userId: { type: Types.ObjectId, ref: 'User' },
    comments: [{ type: Types.ObjectId, ref: 'Comment' }],
    createdAt: { type: Date, default: Date.now },
    likes: [{ type: Types.ObjectId, ref: 'User' }],
    tags: [{ type: Types.ObjectId, ref: 'User' }],
    deletedAt: { type: Date, default: null },
    restoredAt: { type: Date, default: null },
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    strict: true
});

export const postModel = mongoose.model<IPost>('Post', postSchema);