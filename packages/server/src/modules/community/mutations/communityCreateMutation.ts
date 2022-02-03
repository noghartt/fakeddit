import { GraphQLString, GraphQLNonNull } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';

import { GraphQLContext } from '../../graphql/types';

import { CommunityModel } from '../CommunityModel';
import { CommunityType } from '../CommunityType';

export const communityCreate = mutationWithClientMutationId({
  name: 'CommunityCreate',
  inputFields: {
    communityId: { type: new GraphQLNonNull(GraphQLString) },
    displayName: { type: new GraphQLNonNull(GraphQLString) },
  },
  mutateAndGetPayload: async (
    { communityId, ...rest },
    ctx: GraphQLContext,
  ) => {
    if (!ctx?.user) {
      throw new Error('You are not logged in. Please, try again!');
    }

    const communityFound = await CommunityModel.findOne({
      name: communityId,
    });

    if (communityFound) {
      throw new Error(
        'A community with this name has already been created. Please, try again!',
      );
    }

    const community = new CommunityModel({
      ...rest,
      name: communityId,
      admin: ctx.user,
      members: ctx.user,
    });

    await Promise.all([
      community.save(),
      ctx.user.updateOne({
        $addToSet: { communities: community._id },
      }),
    ]);

    return {
      community,
    };
  },
  outputFields: () => ({
    community: {
      type: CommunityType,
      resolve: ({ community }) => community,
    },
  }),
});
