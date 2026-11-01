import { OneUserType, UserGqlMutationTypeSchema, UserGqlQueryTypeSchema } from "./user.type.gql"
import { UserGqlQueryArgsSchema, UserGqlMutationArgsSchema, GetUserArgs } from "./user.args.gql"
import { userSolver } from "./user.resolver.gql"



export class UserGQLSchema {
    constructor() { }
    ///////////////////////////////////////////////////////////////////
    RegisterQuery() {
        return {
            User_Query: {
                type: UserGqlQueryTypeSchema,
                args: UserGqlQueryArgsSchema,
                resolve: userSolver.helloworledQuery
            },
             getUser: {
            type: OneUserType,
            args: GetUserArgs,
            resolve: userSolver.getUser
        }
        }
    }
    ///////////////////////////////////////////////////////////////////
    RegistrMutation() {
    return {
        User_Mutation: {
            type:UserGqlMutationTypeSchema ,
            args:UserGqlMutationArgsSchema,
            resolve:userSolver.helloworledMutation
        }
    };
}
}
export const UserGqlSchema = new UserGQLSchema 