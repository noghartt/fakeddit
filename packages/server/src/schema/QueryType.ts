import { GraphQLObjectType } from 'graphql';

import { version } from '../modules/common/queries';

export const QueryType = new GraphQLObjectType({
  name: 'Query',
  description: 'Root of queries',
  fields: () => ({
    version,
  }),
});
