import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID
} from "graphql";


export const FriendRequestResponseType =
    new GraphQLObjectType({

        name: "FriendRequestResponseType",

        fields: {

            message: {
                type: GraphQLString
            }

        }

    });


export const FriendRequestType =
    new GraphQLObjectType({

        name: "FriendRequestType",

        fields: {

            _id: {
                type: GraphQLID
            },

            senderId: {
                type: GraphQLID
            },

            receiverId: {
                type: GraphQLID
            },

            status: {
                type: GraphQLString
            }

        }

    });