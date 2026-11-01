import {
    acceptFriendRequestArgs,
    rejectFriendRequestArgs,
    sendFriendRequestArgs
} from "./friendRequest.args.gql";

import {
    FriendRequestResponseType,
    FriendRequestType
} from "./friendRequest.type.gql";

import {
    FriendRequestSolvere
} from "./friendRequest.resolver.gql";

import { GraphQLList } from "graphql";


class FriendRequestGQLSchema {

    registerQuery() {

        return {

            getPendingRequests: {

                name: "getPendingRequests",

                type: new GraphQLList(FriendRequestType),

                resolve:
                    FriendRequestSolvere.getPendingRequests

            }

        };

    }


    registerMutation() {

        return {

            sendRequest: {

                name: "sendRequest",

                type: FriendRequestResponseType,

                args: sendFriendRequestArgs,

                resolve:
                    FriendRequestSolvere.sendRequest

            },


            acceptRequest: {

                name: "acceptRequest",

                type: FriendRequestResponseType,

                args: acceptFriendRequestArgs,

                resolve:
                    FriendRequestSolvere.acceptRequest

            },


            rejectRequest: {

                name: "rejectRequest",

                type: FriendRequestResponseType,

                args: rejectFriendRequestArgs,

                resolve:
                    FriendRequestSolvere.rejectRequest

            }

        };

    }

}


export const FriendRequestSchemaGQL =
    new FriendRequestGQLSchema();