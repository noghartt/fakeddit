import { GraphQLObjectType } from 'graphql';

import * as userMutations from '../modules/user/mutations';
import * as communityMutations from '../modules/community/mutations';

export const MutationType = new GraphQLObjectType({
  name: 'Mutation',
  description: 'Root of mutations',
  fields: () => ({
    ...userMutations,
    ...communityMutations,
  }),
});
