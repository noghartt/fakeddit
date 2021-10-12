import { GraphQLSchema } from 'graphql';

import { QueryType } from './schema/QueryType';
import { MutationType } from './schema/MutationType';

export const schema = new GraphQLSchema({
  query: QueryType,
  mutation: MutationType,
});
