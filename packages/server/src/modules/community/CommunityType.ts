import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLID,
  GraphQLNonNull,
} from 'graphql';
import { globalIdField } from 'graphql-relay';
import {
  withFilter,
  connectionArgs,
  connectionDefinitions,
} from '@entria/graphql-mongo-helpers';

import { UserConnection } from '../user/UserType';
import UserLoader from '../user/UserLoader';

import { nodeInterface, registerTypeLoader } from '../graphql/typeRegister';

import { CommunityDocument } from './CommunityModel';
import { load } from './CommunityLoader';

export const CommunityType = new GraphQLObjectType<CommunityDocument>({
  name: 'Community',
  fields: () => ({
    id: globalIdField('Community'),
    name: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: community => community.name,
      description: 'The slugged name of the community - this is unique',
    },
    displayName: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: community => community.displayName,
      description:
        "Some custom name that doens't necessary be the name of the community",
    },
    admin: {
      type: new GraphQLNonNull(GraphQLID),
    },
    // TODO: It should be a connection pagination
    mods: {
      type: new GraphQLNonNull(new GraphQLList(GraphQLID)),
      resolve: community => community.mods,
    },
    members: {
      type: new GraphQLNonNull(UserConnection.connectionType),
      args: { ...connectionArgs },
      resolve: async (community, args, context) =>
        await UserLoader.loadAll(
          context,
          withFilter(args, { communities: community._id }),
        ),
      description:
        'A list containing the IDs of all users that is member of this community',
    },
  }),
  interfaces: () => [nodeInterface],
});

export const CommunityConnection = connectionDefinitions({
  name: 'CommunityConnectioon',
  nodeType: CommunityType,
});

registerTypeLoader(CommunityType, load);
