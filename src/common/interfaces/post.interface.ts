import { Types } from "mongoose";

export interface IPost {
    title: string;
    content: string;

    userId: Types.ObjectId;

    comments: Types.ObjectId[];
    likes: Types.ObjectId[];
    tags: Types.ObjectId[];

    createdAt: Date;
    updatedAt: Date;

    deletedAt: Date | null;
    restoredAt: Date | null;
}