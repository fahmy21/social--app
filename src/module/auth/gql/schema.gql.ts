import { GraphQLObjectType, GraphQLSchema } from "graphql";
import { UserGqlSchema } from "../../user/gql/user.schema.gql";
import { PostSchemaGQL } from "../../post/gql/post.schema.gql";
import { CommentSchemaGQL } from "../../comment/gql/comment.schema.gql";
import { FriendRequestSchemaGQL } from "../../friendRequest/gql/friendRequest.schema.gql";
import { FriendSchemaGQL } from "../../friend/gql/friend.schema.gql";
//////////////////////////////////////////////////////
export const query = new GraphQLObjectType({
    name: "RootQuery",
    fields: {
        ...UserGqlSchema.RegisterQuery(),
        ...PostSchemaGQL.registerQuery(),
        ...CommentSchemaGQL.registerQuery(),
        ...FriendSchemaGQL.registerQuery(),
        ...FriendRequestSchemaGQL.registerQuery()
    }
})
//////////////////////////////////////////////////////
export const mutation = new GraphQLObjectType({
    name: "RootMutation",
    fields: {
        ...UserGqlSchema.RegistrMutation(),
        ...PostSchemaGQL.registerMutation(),
        ...CommentSchemaGQL.registerMutation(),
        ...FriendRequestSchemaGQL.registerMutation(),
        ...FriendSchemaGQL.registerMutation()

    }
})
export const schema = new GraphQLSchema({ query, mutation })
