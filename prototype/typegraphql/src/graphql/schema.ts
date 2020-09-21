import { GraphQLSchema } from 'graphql';
import { buildSchemaSync } from 'type-graphql';

// TypeGraphQL-prisma resolvers
import {
  UserRelationsResolver,
  UserCrudResolver,
} from '../../prisma/generated/type-graphql';

// Custum Resolvers
import UserResolver from './User/resolver';

const mergedSchema: GraphQLSchema = buildSchemaSync({
  resolvers: [UserResolver, UserRelationsResolver, UserCrudResolver],
  validate: false,
});

export default mergedSchema;
