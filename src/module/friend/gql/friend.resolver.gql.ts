import { JwtPayload } from "jsonwebtoken";
import { TokenService } from "../../../common/service/token.service";
import { FriendService } from "../friend.service";

class FriendSolver {

    private friendService: FriendService;
    private tokenService: TokenService;

    constructor() {

        this.friendService =
            new FriendService();

        this.tokenService =
            new TokenService();

    }

    getFriends = async (
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

        return await this.friendService.getFriends(
            id as string
        );

    };


    removeFriend = async (
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

        return await this.friendService.removeFriend(
            id as string,
            args.friendId
        );

    };

}

export const FriendSolvere =
    new FriendSolver();