import { JwtPayload } from "jsonwebtoken";
import { CommentService } from "../comment.service";
import { TokenService } from "../../../common/service/token.service";

class CommentSolver {

    private commentService: CommentService;
    private tokenService: TokenService;

    constructor() {

        this.commentService =
            new CommentService();

        this.tokenService =
            new TokenService();
    }

    // Add Comment
    createComment = async (
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

        return await this.commentService.createComment(
            args,
            id as string
        );
    };

    // Get Comments
    getComments = async (
        parent: any,
        args: any
    ) => {

        return await this.commentService.getPostComments(
            args.postId
        );
    };

    // Delete Comment
    deleteComment = async (
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

        return await this.commentService.deleteComment(
            args.commentId,
            id as string
        );
    };
}

export const CommentSolvere =
    new CommentSolver();