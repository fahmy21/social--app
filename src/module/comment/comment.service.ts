import { IComment } from "../../common/interfaces/comment.interface";
import { commentModel } from "../../database/model/comment.model";
import { DatabaseRepository } from "../../database/reposatory/database.reposatory";

export class CommentService {

    private CommentRepository: DatabaseRepository<IComment>;

    constructor() {
        this.CommentRepository =
            new DatabaseRepository<IComment>(commentModel);
    }

    async createComment(data: IComment, userId: string) {

        const comment =
            await this.CommentRepository.create({
                ...data,
                userId: userId as any
            });

        return {
            message: "comment created successfully"
        };
    }

    async getPostComments(postId: string) {

        const comments =
            await this.CommentRepository.Find_All({
                filter: {
                    postId: postId
                },
                populate: "userId"
            });

        return comments;
    }

    async deleteComment(
        commentId: string,
        userId: string
    ) {

        const comment =
            await this.CommentRepository.Find_One({
                filter: {
                    _id: commentId,
                    userId: userId
                }
            });

        if (!comment) {

            throw new Error(
                "Comment not found or you are not the owner"
            );

        }

        await this.CommentRepository.Delete_One({
            filter: {
                _id: commentId,
                userId: userId
            }
        });

        return {
            message: "comment deleted successfully"
        };
    }
}