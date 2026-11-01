import mongoose, { Schema, Types } from "mongoose";
import { IChat, IMessage } from "../../common/interfaces/chat.interface";
import { Chat_Enum } from "../../common/enums/chat.enums";


export const MessageSchema = new Schema<IMessage>({

    content: {
        type: String,
        required: function (this) {
            return !this.attachments?.length
        }
    },

    attachments: {
        type: [String]
    },

    likes: [
        {
            type: Types.ObjectId,
            ref: 'user'
        }
    ],

    tags: [
        {
            type: Types.ObjectId,
            ref: 'user'
        }
    ],
     createdAt: {
        type: Date,
        default: Date.now
    },

    updatedAt: {
        type: Date,
        default: Date.now
    },

    deletedAt: {
        type: Date,
        default: null
    },

    restoredAt: {
        type: Date,
        default: null
    }

})

export const chatsSchema = new Schema<IChat>({
    participants: [
        {
            type: Types.ObjectId,
            ref: "user"
        }
    ],

    createBy: {
        type: Types.ObjectId,
        ref: "user"
    },

    type: {
        type: String,
        enum: Chat_Enum,
        default: Chat_Enum.ovm
    },
    message:{
        type:[MessageSchema],
        required:true
    },

    group: {
        type: String,

        required: function (this: IChat) {
            return this.type === Chat_Enum.ovm;
        }
    },
    groupImage: {
        type: String,
        required: function (this) {
            return this.type === Chat_Enum.ovm;
        }
    },
    roomId:{
        type:String,
        required:true
    },

    createdAt: {
        type: Date,
        default: Date.now
    },

    updatedAt: {
        type: Date,
        default: Date.now
    },

    deletedAt: {
        type: Date,
        default: null
    },

    restoredAt: {
        type: Date,
        default: null
    }
},{
    timestamps: true,
    toJSON: { virtuals: true },
    strict: true
});
export const chatModel =
    mongoose.model<IChat>("ChatModel", chatsSchema);