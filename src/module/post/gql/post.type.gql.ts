import {
    GraphQLID,
    GraphQLList,
    GraphQLObjectType,
    GraphQLString
} from "graphql";

import { OneUserType } from "../../user/gql/user.type.gql";

/////////////////////////////////////////////////////////

export const UserCommentType = new GraphQLObjectType({

    name: "UserComment",

    fields: {

        userId: {
            type: GraphQLID
        },

        content: {
            type: GraphQLString
        }

    }

});

/////////////////////////////////////////////////////////

export const CreatePostType = new GraphQLObjectType({

    name: "CreatePost",

    fields: {

        message: {
            type: GraphQLString
        }

    }

});

/////////////////////////////////////////////////////////

export const OnePostTypeSchema = new GraphQLObjectType({

    name: "OnePostType",

    fields: {

        title: {
            type: GraphQLString
        },

        content: {
            type: GraphQLString
        },

        userId: {
            type: GraphQLID
        },

        comments: {
            type: new GraphQLList(UserCommentType)
        },

        likes: {
            type: new GraphQLList(OneUserType)
        },

        tags: {
            type: new GraphQLList(GraphQLString)
        },

        createdAt: {
            type: GraphQLString
        },

        updatedAt: {
            type: GraphQLString
        },

        deletedAt: {
            type: GraphQLString
        },

        restoredAt: {
            type: GraphQLString
        }

    }

});

/////////////////////////////////////////////////////////

export const getAllPostsType = new GraphQLObjectType({

    name: "GetAllPostsType",

    fields: {

        message: {
            type: new GraphQLList(OnePostTypeSchema)
        }

    }

});

/////////////////////////////////////////////////////////

export const PostGqlQueryTypeSchema = new GraphQLObjectType({

    name: "PostIdQuery",

    fields: {

        PostList: {
            type: new GraphQLList(OnePostTypeSchema)
        }

    }

});