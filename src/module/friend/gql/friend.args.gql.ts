import { GraphQLID } from "graphql";

export const getFriendsArgs = {};

export const addFriendArgs = {
    friendId: {
        type: GraphQLID
    }
};

export const removeFriendArgs = {
    friendId: {
        type: GraphQLID
    }
};