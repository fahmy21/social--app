import { GraphQLBoolean, GraphQLEnumType, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";
import { GenderEnums, ProviderEnums, RoleEnums } from "../../../common";


export const UserGqlQueryTypeSchema = new GraphQLObjectType({
    name: "helloworldQuery",
    fields: {
        message: {
            type: GraphQLString
        }
    }
})
///////////////////////////////////////////////////////////////////////////

export const UserGqlMutationTypeSchema = new GraphQLObjectType({
    name: "helloworldMutation",
    fields: {
        message: {
            type: GraphQLString
        }
    }
})
///////////////////////////////////////////////////////////////////////////


export const OneUserType = new GraphQLObjectType({
    name: "oneusertype",
    fields: {
        UserName: { type: new GraphQLNonNull(GraphQLString) },

        FirstName: { type: GraphQLString },
        LastName: { type: GraphQLString },
        ////////////////////////////////////////
        // FullName: {
        //     type: GraphQLString,

        //     resolve: (parent) => {
        //         console.log("PARENT =", parent);

        //         return `${parent.FirstName} ${parent.LastName}`;
        //     }
        // },
        ///////////////////////////////////////

        Email: { type: new GraphQLNonNull(GraphQLString) },
        PhoneNumber: { type: new GraphQLNonNull(GraphQLString) },
        // Password: { type: new GraphQLNonNull(GraphQLString) },
        // confirmPassword: { type: new GraphQLNonNull(GraphQLString) },

        Gender: {
            type: new GraphQLEnumType({
                name: "GenderEnumType",
                values: {
                    Male: { value: GenderEnums.Male },
                    Female: { value: GenderEnums.Female }
                }
            })
        },
        Role: {
            type: new GraphQLEnumType({
                name: "RoleEnumType",
                values: {
                    Admin: { value: RoleEnums.Admin },
                    User: { value: RoleEnums.User }
                }
            })
        },
        ProviderEnums: {
            type: new GraphQLEnumType({
                name: "ProvidEnumType",
                values: {
                    Google: { value: ProviderEnums.Google },
                    System: { value: ProviderEnums.System }
                }
            })
        },
        ConfirmEmail: { type: GraphQLBoolean },
        profilePicture: { type: new GraphQLList(GraphQLString) },
    }
})








