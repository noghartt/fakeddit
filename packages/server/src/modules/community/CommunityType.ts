import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLID,
  GraphQLNonNull,
} from 'graphql';
import { globalIdField } from 'graphql-relay';

import { Community } from './CommunityModel';

export const CommunityType = new GraphQLObjectType<Community>({
  name: 'Community',
  fields: {
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
    mods: {
      type: new GraphQLNonNull(new GraphQLList(GraphQLID)),
      resolve: community => community.mods,
    },
    members: {
      // TODO: Turn it a list of ObjectIDs
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(GraphQLID))),
      resolve: community => community.members,
      description:
        'A list containing the IDs of all users that is member of this community',
    },
  },
});
