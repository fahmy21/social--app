import { PostService } from "../post.service";
import { TokenService } from "../../../common/service/token.service";
import { JwtPayload } from "jsonwebtoken";
import { GQLValidation } from "../../../common/service/validation";
import { postValidation } from "../post.validation";

class PostSolver {

    private postservice: PostService;
    private tokenService: TokenService;

    constructor() {
        this.postservice = new PostService();
        this.tokenService = new TokenService();
    }

    //////////////////////////////////////////////////////////////////////////////////

    PostList = async (parent: any, args: any, context: any) => {

        let tokenHeaders = context.req.headers.authorization;
        let [bearer, token] = tokenHeaders.split(" ");

        GQLValidation(postValidation, args);

        let decoded = await this.tokenService.decodeToken(token);

        let { id } = decoded as JwtPayload;

        let postData = await this.postservice.getallpost(id);

        return {
            message: postData
        };
    };

    //////////////////////////////////////////////////////////////////////////////////

    deletePost = async (parent: any, args: any, context: any) => {

        const tokenHeaders = context.req.headers.authorization;
        const [bearer, token] = tokenHeaders.split(" ");

        const decoded = await this.tokenService.decodeToken(token);

        const { id } = decoded as JwtPayload;

        return await this.postservice.deletePost(
            args.postId,
            id
        );
    };

    //////////////////////////////////////////////////////////////////////////////////

    creatpost = async (parent: any, args: any) => {

        const addedPost = await this.postservice.createPost(args);

        return {
            message: addedPost
        };
    };
}

export const PostSolvere = new PostSolver();