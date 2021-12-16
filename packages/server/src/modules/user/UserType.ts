import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLList,
  GraphQLID,
} from 'graphql';
import { globalIdField } from 'graphql-relay';

import { User } from './UserModel';

export const UserType = new GraphQLObjectType<User>({
  name: 'User',
  fields: () => ({
    id: globalIdField('User'),
    username: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: user => user.username,
    },
    displayName: {
      type: GraphQLString,
      resolve: user => user.displayName,
    },
    email: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: user => user.email,
    },
    communities: {
      type: new GraphQLNonNull(new GraphQLList(GraphQLID)),
      resolve: user => user.communities,
    },
  }),
});
