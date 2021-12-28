import { GraphQLString, GraphQLNonNull } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';

import { GraphQLContext } from '../../graphql/types';

import { CommunityModel } from '../CommunityModel';
import { CommunityType } from '../CommunityType';

import { UserModel } from '../../user/UserModel';

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

    const foundUser = await UserModel.findById(ctx.user?._id);

    if (
      !foundCommunity.members.includes(foundUser?._id) ||
      !foundUser?.communities.includes(foundCommunity._id)
    ) {
      throw new Error('You are not a member of this community.');
    }

    if (foundCommunity.admin.equals(foundUser._id)) {
      throw new Error(
        "You can't exit a community using this method being the admin. Try communityExitAsAdmin mutation!",
      );
    }

    await Promise.all([
      foundCommunity.updateOne({ $pull: { members: foundUser._id } }),
      foundUser.updateOne({ $pull: { communities: foundCommunity._id } }),
    ]);

    return {
      userId: foundUser._id,
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
