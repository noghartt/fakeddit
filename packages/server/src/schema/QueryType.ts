import { GraphQLObjectType, GraphQLString } from 'graphql';

export const QueryType = new GraphQLObjectType({
  name: 'Query',
  description: 'Root of queries',
  fields: () => ({
    tururu: {
      type: GraphQLString,
      resolve: () => 'Tururu...',
    },
  }),
});
