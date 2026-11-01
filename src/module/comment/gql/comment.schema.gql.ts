import { GraphQLList } from "graphql";

import {
    addCommentArgs,
    getCommentsArgs,
    deleteCommentArgs
} from "./comment.args.gql";

import {
    CommentResponseType,
    CommentType
} from "./comment.type.gql";
import { CommentSolvere } from "./comment.resolver.gql";



class CommentGQLSchema {

    constructor() {}

    registerQuery() {

        return {

            getComments: {

                name: "getComments",

                type: new GraphQLList(CommentType),

                args: getCommentsArgs,

                resolve: CommentSolvere.getComments

            }

        };
    }

    registerMutation() {

        return {

            createComment: {

                name: "createComment",

                type: CommentResponseType,

                args: addCommentArgs,

                resolve: CommentSolvere.createComment

            },

            deleteComment: {

                name: "deleteComment",

                type: CommentResponseType,

                args: deleteCommentArgs,

                resolve: CommentSolvere.deleteComment

            }

        };
    }
}

export const CommentSchemaGQL =
    new CommentGQLSchema();