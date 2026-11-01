import { GraphQLID, GraphQLString } from "graphql";


export const UserGqlQueryArgsSchema = {
    name: {
        type: GraphQLString
    },
    email: {
        type: GraphQLString
    },
    password: {
        type: GraphQLString
    },
}
//////////////////////////////////////////////////////////////////////////////
export const GetUserArgs = {
    id: {
        type: GraphQLID
    }
};
//////////////////////////////////////////////////////////////////////////////

export const UserGqlMutationArgsSchema = {
    name: {
        type: GraphQLString
    },
    email: {
        type: GraphQLString
    },
    password: {
        type: GraphQLString
    }
}