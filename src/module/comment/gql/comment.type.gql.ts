import {GraphQLID,GraphQLList, GraphQLObjectType,GraphQLString} from "graphql";

export const CommentType = new GraphQLObjectType({

    name: "CommentType",

    fields: {

        _id: {
            type: GraphQLID
        },

        userId: {
            type: GraphQLID
        },

        postId: {
            type: GraphQLID
        },

        content: {
            type: GraphQLString
        },

        createdAt: {
            type: GraphQLString
        },

        updatedAt: {
            type: GraphQLString
        }

    }
});

export const CommentResponseType = new GraphQLObjectType({

    name: "CommentResponseType",

    fields: {

        message: {
            type: GraphQLString
        }

    }

});

export const GetCommentsType = new GraphQLObjectType({

    name: "GetCommentsType",

    fields: {

        message: {
            type: GraphQLString
        },

        comments: {
            type: new GraphQLList(CommentType)
        }

    }

});