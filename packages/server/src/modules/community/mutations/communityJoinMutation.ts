import { GraphQLString, GraphQLNonNull } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';

import { GraphQLContext } from '../../graphql/types';

import { CommunityModel } from '../CommunityModel';
import { CommunityType } from '../CommunityType';

export const communityJoin = mutationWithClientMutationId({
  name: 'CommunityJoin',
  inputFields: {
    communityId: { type: new GraphQLNonNull(GraphQLString) },
  },
  mutateAndGetPayload: async ({ communityId }, ctx: GraphQLContext) => {
    if (!ctx.user) {
      throw new Error('You are not logged in. Please, try again!');
    }

    const community = await CommunityModel.findOne({ name: communityId });

    if (!community) {
      throw new Error("This community doesn't exist. Please, try again.");
    }

    const foundMemberIdInCommuntiy = community.members.includes(ctx.user._id);
    const foundCommuntiyIdInUser = ctx.user.communities.includes(community._id);

    if (foundMemberIdInCommuntiy || foundCommuntiyIdInUser) {
      throw new Error('You are already a member of this community.');
    }

    await Promise.all([
      community.updateOne({
        $addToSet: { members: [...community.members, ctx.user._id] },
      }),
      ctx.user.updateOne({
        $addToSet: {
          communities: [...(ctx.user.communities || []), community._id],
        },
      }),
    ]);

    return {
      userId: ctx.user._id,
      communityId: community._id,
    };
  },
  outputFields: () => ({
    community: {
      type: CommunityType,
      resolve: async ({ communityId }) =>
        await CommunityModel.findOne({ _id: communityId }),
    },
  }),
});
