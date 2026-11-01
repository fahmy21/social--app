import { Types } from "mongoose";
import { Chat_Enum } from "../../common/enums/chat.enums";
import { Not_Found_Exception } from "../../common/excaptions/error.exceptions";
import { IChat } from "../../common/interfaces/chat.interface";
import { chatModel } from "../../database/model/chat.model";
import { DatabaseRepository } from "../../database/reposatory/database.reposatory";


export class ChatService {

    private chatReposatry: DatabaseRepository<IChat>;

    constructor() {

        this.chatReposatry =
            new DatabaseRepository<IChat>(chatModel);

    }


    async getchat(participantsId: string, userId: string) {

        const chat = await this.chatReposatry.Find_One({

            filter: {
                participants: {
                    $all: [
                        participantsId,
                        userId
                    ]
                }
            },

            populate: "participants"

        });


        if (!chat) {

            throw new Not_Found_Exception("chat not found");

        }

        return chat;
    }
    ////////////////////////////////////////////////////////////////////////////////////////
async addChat(content: string, userId: string, participantId: string) {

    let chat = await this.chatReposatry.Updata_one({
        filter: {
            participants: {
                $all: [
                    new Types.ObjectId(participantId),
                    new Types.ObjectId(userId)
                ]
            },
            type: Chat_Enum.ovo
        },

        data: {
            $push: {
                message: {
                    content,
                    createdBy: new Types.ObjectId(userId)
                }
            }
        }
    });

    if (!chat.modifiedCount) {
        let addchat = await this.chatReposatry.create({
            participants: [
                new Types.ObjectId(participantId),
                new Types.ObjectId(userId)
            ],

            createBy: new Types.ObjectId(userId),

            type: Chat_Enum.ovo,

            roomId: `${userId}_${participantId}`,

            message: [
                {
                    content,
                    createdBy: new Types.ObjectId(userId)
                }
            ]
        });
    }
}
}