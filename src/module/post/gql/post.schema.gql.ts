import {
    addPostArgs,
    deletePostArgs,
    PostGqlQueryArgsSchema
} from "./post.args.gql";

import { PostSolvere } from "./post.resolver.gql";

import {
    CreatePostType,
    getAllPostsType
} from "./post.type.gql";

class PostGQLSchema {

    constructor() {}

    registerQuery() {

        return {

            postlist: {
                name: "postlistqury",
                type: getAllPostsType,
                args: PostGqlQueryArgsSchema,
                resolve: PostSolvere.PostList
            }

        };
    }

    registerMutation() {

        return {

            postlist: {
                name: "postlistrMutation",
                type: CreatePostType,
                args: addPostArgs,
                resolve: PostSolvere.creatpost
            },

            deletePost: {
                name: "deletePostMutation",
                type: CreatePostType,
                args: deletePostArgs,
                resolve: PostSolvere.deletePost
            }

        };
    }
}

export const PostSchemaGQL = new PostGQLSchema();