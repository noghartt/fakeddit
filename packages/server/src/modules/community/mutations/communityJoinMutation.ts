import { GraphQLString, GraphQLNonNull } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';

import { GraphQLContext } from '../../graphql/types';

import { UserType } from '../../user/UserType';
import { UserModel } from '../../user/UserModel';

import { CommunityModel } from '../CommunityModel';
import { CommunityType } from '../CommunityType';

export const communityJoin = mutationWithClientMutationId({
  name: 'CommunityJoin',
  inputFields: {
    communityId: { type: new GraphQLNonNull(GraphQLString) },
  },
  outputFields: () => ({
    community: {
      type: CommunityType,
      resolve: async ({ communityId }) =>
        await CommunityModel.findOne({ _id: communityId }),
    },
    me: {
      type: UserType,
      resolve: async ({ userId }) => await UserModel.findOne({ _id: userId }),
    },
  }),
  mutateAndGetPayload: async ({ communityId }, ctx: GraphQLContext) => {
    // TODO: In some way, you can pass it to a middleware. But IDK how to do it yet.
    if (!ctx.user) {
      throw new Error('You are not logged in. Please, try again!');
    }

    const community = await CommunityModel.findOne({ name: communityId });

    if (!community) {
      throw new Error("This community doesn't exist. Please, try again.");
    }

    if (
      community.members.includes(ctx.user._id) ||
      ctx.user.communities.includes(community._id)
    ) {
      throw new Error('You are already a member of this community.');
    }

    await Promise.all([
      community.updateOne({
        $addToSet: { members: [...community.members, ctx.user._id] },
      }),
      ctx.user.updateOne({
        $addToSet: { communities: [...ctx.user.communities, community._id] },
      }),
    ]);

    return {
      userId: ctx.user._id,
      communityId: community._id,
    };
  },
});
