import { GraphQLFieldConfig } from 'graphql';

import { UserType } from '../UserType';
import UserLoader from '../UserLoader';

export const me: GraphQLFieldConfig<any, any, any> = {
  type: UserType,
  resolve: (_root, _args, context) =>
    UserLoader.load(context, context.user?._id),
};
