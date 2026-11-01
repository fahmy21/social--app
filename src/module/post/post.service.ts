import { IPost } from "../../common/interfaces/post.interface";
import { postModel } from "../../database/model/post.model";
import { DatabaseRepository } from "../../database/reposatory/database.reposatory";

export class PostService {

    private PostRepository: DatabaseRepository<IPost>;

    constructor() {

        this.PostRepository =
            new DatabaseRepository<IPost>(postModel);

    }

    async getallpost(id: string) {

        let find_all_post =
            await this.PostRepository.Find_All({

                filter: {
                    userId: id
                },

                populate: "userId"

            });

        return find_all_post;
    }

    async createPost(data: IPost) {

        let post =
            await this.PostRepository.create(data);

        return {
            message: "post created"
        };
    }

    async deletePost(
        postId: string,
        userId: string
    ) {

        const post =
            await this.PostRepository.Find_One({

                filter: {
                    _id: postId,
                    userId: userId
                }

            });

        if (!post) {

            throw new Error(
                "Post not found or you are not the owner"
            );

        }

        await this.PostRepository.Delete_One({

            filter: {
                _id: postId,
                userId: userId
            }

        });

        return {
            message: "Post deleted successfully"
        };
    }
}