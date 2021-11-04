import { GraphQLObjectType } from 'graphql';

import { userRegisterMutation } from '../modules/user/mutations';

export const MutationType = new GraphQLObjectType({
  name: 'Mutation',
  description: 'Root of mutations',
  fields: () => ({ userRegisterMutation }),
});
