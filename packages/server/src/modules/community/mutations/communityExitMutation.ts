import { GraphQLString, GraphQLNonNull } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';

import { GraphQLContext } from '../../graphql/types';

import { CommunityModel } from '../CommunityModel';
import { CommunityType } from '../CommunityType';

export const communityExit = mutationWithClientMutationId({
  name: 'CommunityExit',
  inputFields: {
    communityName: { type: new GraphQLNonNull(GraphQLString) },
  },
  mutateAndGetPayload: async ({ communityName }, ctx: GraphQLContext) => {
    if (!ctx.user) {
      throw new Error('You are not logged in. Please, try again!');
    }

    const foundCommunity = await CommunityModel.findOne({
      name: communityName,
    });

    if (!foundCommunity) {
      throw new Error("This community doesn't exist. Please, try again.");
    }

    const foundMemberIdInCommuntiy = foundCommunity.members.includes(
      ctx.user._id,
    );
    const foundCommuntiyIdInUser = ctx.user.communities.includes(
      foundCommunity._id,
    );

    if (!foundMemberIdInCommuntiy || foundCommuntiyIdInUser) {
      throw new Error('You are not a member of this community.');
    }

    if (foundCommunity.admin.equals(ctx.user._id)) {
      throw new Error(
        "You can't exit a community using this method being the admin. Try communityExitAsAdmin mutation!",
      );
    }

    await Promise.all([
      foundCommunity.updateOne({ $pull: { members: ctx.user._id } }),
      ctx.user.updateOne({ $pull: { communities: foundCommunity?._id } }),
    ]);

    return {
      userId: ctx.user._id,
      communityId: foundCommunity._id,
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
