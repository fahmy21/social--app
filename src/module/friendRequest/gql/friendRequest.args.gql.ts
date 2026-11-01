import { GraphQLID } from "graphql";

export const sendFriendRequestArgs = {

    receiverId: {
        type: GraphQLID
    }

};

export const acceptFriendRequestArgs = {

    requestId: {
        type: GraphQLID
    }

};

export const rejectFriendRequestArgs = {

    requestId: {
        type: GraphQLID
    }

};