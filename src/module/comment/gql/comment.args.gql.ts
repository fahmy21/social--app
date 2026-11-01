import { GraphQLID, GraphQLString } from "graphql";

export const addCommentArgs = {

    postId: {
        type: GraphQLID
    },

    content: {
        type: GraphQLString
    }

};

export const getCommentsArgs = {

    postId: {
        type: GraphQLID
    }

};

export const deleteCommentArgs = {

    commentId: {
        type: GraphQLID
    }

};