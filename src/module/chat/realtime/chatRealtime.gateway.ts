import { ChatEvents } from "./chatEvents"


export class ChatGateway {
    private chat_event: ChatEvents

    constructor() {
        this.chat_event = new ChatEvents
    }

    Register(socket: any, io: any) {

        this.chat_event.sayhi(socket)
        this.chat_event.addMessage(socket,io)
    }
}

export const RealTime_ChatGateway = new ChatGateway()