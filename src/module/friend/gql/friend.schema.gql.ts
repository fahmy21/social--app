import { GraphQLList } from "graphql";

import {
    removeFriendArgs
} from "./friend.args.gql";

import {
    FriendResponseType,
    FriendType
} from "./friend.type.gql";

import {
    FriendSolvere
} from "./friend.resolver.gql";


class FriendGQLSchema {

    registerQuery() {

        return {

            getFriends: {

                name: "getFriends",

                type: new GraphQLList(FriendType),

                resolve:
                    FriendSolvere.getFriends

            }

        };

    }


    registerMutation() {

        return {

            removeFriend: {

                name: "removeFriend",

                type: FriendResponseType,

                args: removeFriendArgs,

                resolve:
                    FriendSolvere.removeFriend

            }

        };

    }

}


export const FriendSchemaGQL =
    new FriendGQLSchema();