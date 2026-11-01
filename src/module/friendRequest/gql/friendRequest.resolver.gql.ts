import { JwtPayload } from "jsonwebtoken";
import { TokenService } from "../../../common/service/token.service";
import { FriendRequestService } from "../friendRequest.service";

class FriendRequestSolver {

    private friendRequestService: FriendRequestService;
    private tokenService: TokenService;

    constructor() {

        this.friendRequestService =
            new FriendRequestService();

        this.tokenService =
            new TokenService();

    }


    sendRequest = async (
        parent: any,
        args: any,
        context: any
    ) => {

        const tokenHeaders =
            context.req.headers.authorization;

        const [bearer, token] =
            tokenHeaders.split(" ");

        const decoded =
            await this.tokenService.decodeToken(token);

        const { id } =
            decoded as JwtPayload;

        return await this.friendRequestService.sendRequest(
            id as string,
            args.receiverId
        );

    };


    acceptRequest = async (
        parent: any,
        args: any,
        context: any
    ) => {

        const tokenHeaders =
            context.req.headers.authorization;

        const [bearer, token] =
            tokenHeaders.split(" ");

        const decoded =
            await this.tokenService.decodeToken(token);

        const { id } =
            decoded as JwtPayload;

        return await this.friendRequestService.acceptRequest(
            args.requestId,
            id as string
        );

    };


    rejectRequest = async (
        parent: any,
        args: any,
        context: any
    ) => {

        const tokenHeaders =
            context.req.headers.authorization;

        const [bearer, token] =
            tokenHeaders.split(" ");

        const decoded =
            await this.tokenService.decodeToken(token);

        const { id } =
            decoded as JwtPayload;

        return await this.friendRequestService.rejectRequest(
            args.requestId,
            id as string
        );

    };
    getPendingRequests = async (
        parent: any,
        args: any,
        context: any
    ) => {

        const tokenHeaders =
            context.req.headers.authorization;

        const [bearer, token] =
            tokenHeaders.split(" ");

        const decoded =
            await this.tokenService.decodeToken(token);

        const { id } =
            decoded as JwtPayload;

        return await this.friendRequestService.getPendingRequests(
            id as string
        );
    };

}

export const FriendRequestSolvere =
    new FriendRequestSolver();