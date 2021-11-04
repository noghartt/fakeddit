import { GraphQLObjectType, GraphQLString, GraphQLNonNull } from 'graphql';
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
      type: new GraphQLNonNull(GraphQLString),
      resolve: user => user.displayName,
    },
    email: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: user => user.password,
    },
    password: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: user => user.password,
    },
  }),
});
