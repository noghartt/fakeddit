import { GraphQLString, GraphQLNonNull } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';

import { GraphQLContext } from '../../graphql/types';

import { CommunityModel } from '../CommunityModel';
import { CommunityType } from '../CommunityType';

export const createCommunityMutation = mutationWithClientMutationId({
  name: 'CreateCommunity',
  inputFields: {
    communityId: { type: new GraphQLNonNull(GraphQLString) },
    displayName: { type: new GraphQLNonNull(GraphQLString) },
  },
  outputFields: () => ({
    community: {
      type: CommunityType,
      resolve: ({ community }) => community,
    },
  }),
  mutateAndGetPayload: async (
    { communityId, ...rest },
    ctx: GraphQLContext,
  ) => {
    // TODO: In some way, you can pass it to a middleware. But IDK how to do it yet.
    if (!ctx.user) {
      throw new Error('You are not logged in. Please, try again!');
    }

    const findedCommunity = await CommunityModel.findOne({
      name: communityId,
    });

    if (findedCommunity) {
      throw new Error(
        'A community with this name has already been created. Please, try again!',
      );
    }

    const community = new CommunityModel({
      ...rest,
      name: communityId,
      admin: ctx.user._id,
      members: ctx.user._id,
      mods: [],
    });

    await community.save();

    return {
      community,
    };
  },
});
