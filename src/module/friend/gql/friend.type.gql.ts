import {
    GraphQLID,
    GraphQLList,
    GraphQLObjectType,
    GraphQLString
} from "graphql";

export const FriendType = new GraphQLObjectType({

    name: "FriendType",

    fields: {

        _id: {
            type: GraphQLID
        },

        userId: {
            type: GraphQLID
        },

        friendId: {
            type: GraphQLID
        },

        createdAt: {
            type: GraphQLString
        },

        updatedAt: {
            type: GraphQLString
        }

    }

});

export const FriendResponseType =
    new GraphQLObjectType({

        name: "FriendResponseType",

        fields: {

            message: {
                type: GraphQLString
            }

        }

    });