import { Types } from "mongoose";
import { redis } from "../../../common/service/redis.service";
import { ChatService } from "../chat.service";

export class ChatEvents {

    private chatService: ChatService;

    constructor() {
        this.chatService = new ChatService();
    }

    sayhi(socket: any) {

        return socket.on("sayHi", (data: any) => {
            console.log(data);
        });

    }

    addMessage(socket: any, io: any) {

        return socket.on("sendMessage", async (data: any) => {

            const { content, sendTo } = data;

            // Save message in database
            const chat = await this.chatService.addChat(
                content,
                socket.data.id,
                sendTo
            );

            // Get receiver sockets from Redis
            const receiverSockets = await redis.getSockets(
                new Types.ObjectId(sendTo)
            );

            // Send message to receiver
            receiverSockets.forEach((socketId) => {

                io.to(socketId).emit("newMessage", {
                    content,
                    senderId: socket.data.id
                });

            });

            // Response to sender
            socket.emit("successMessage", {
                content,
                sendTo
            });

        });

    }

}