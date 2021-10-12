import { GraphQLObjectType, GraphQLString } from 'graphql';

export const MutationType = new GraphQLObjectType({
  name: 'Mutation',
  description: 'Root of mutations',
  fields: () => ({
    tururu: {
      type: GraphQLString,
      resolve: () => 'Tururu...',
    },
  }),
});
