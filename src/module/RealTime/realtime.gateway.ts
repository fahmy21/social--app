import { Bad_Request_Exception } from "../../common/excaptions/error.exceptions";
import { redis } from "../../common/service/redis.service";
import { TokenService } from "../../common/service/token.service";
import { Server } from "socket.io";
import { RealTime_ChatGateway } from "../chat/realtime/chatRealtime.gateway";

export class RealTime_GateWay {

    private token_service: TokenService;

    constructor() {
        this.token_service = new TokenService();
    }

    authinticate = async (socket: any, next: any) => {

        try {

            const token = socket.handshake.auth.token;

            if (!token) {
                throw new Bad_Request_Exception("Token is missing");
            }

            const decoded_Token = this.token_service.decodeToken(token);

            if (!decoded_Token) {
                throw new Bad_Request_Exception("Token is not valid");
            }

            const userId = typeof decoded_Token === "object" ? decoded_Token.id : undefined;

            if (!userId) {
                throw new Bad_Request_Exception("User ID not found in token");
            }


            socket.data = decoded_Token;

            next();

        } catch (error) {

            next(error as Error);

        }

    }


    initalizer(HttpServer: any) {

        const io = new Server(HttpServer, {
            cors: {
                origin: "*"
            }
        });

        // =========================================
        // Socket Authentication Middleware
        // =========================================

        io.use(this.authinticate);

        // =========================================
        // Connection
        // =========================================

        io.on("connection", async (socket) => {
       

            try {

                const userId = socket.data.id;

                RealTime_ChatGateway.Register(socket, io)

                await redis.addSocket(userId, socket.id);


                // =====================================
                // Disconnect
                // =====================================

                socket.on("disconnect", async () => {

                    console.log(`Socket disconnected: ${socket.id}`);

                    await redis.removeSocket(userId, socket.id);

                });

         

            } catch (error) {

                socket.emit("custom_error", error);
            }

        });

    }

}
export const realTime_GateWay = new RealTime_GateWay()