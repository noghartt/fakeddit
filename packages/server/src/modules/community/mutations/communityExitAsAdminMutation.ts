import { GraphQLString, GraphQLNonNull } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';

import { GraphQLContext } from '../../graphql/types';

import { CommunityModel } from '../CommunityModel';
import { CommunityType } from '../CommunityType';

import { UserModel } from '../../user/UserModel';
import { UserType } from '../../user/UserType';
import UserLoader from '../../user/UserLoader';

export const communityExitAsAdmin = mutationWithClientMutationId({
  name: 'CommunityExitAsAdmin',
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

    if (foundCommunity.mods.length > 0) {
      await foundCommunity.updateOne({
        admin: foundCommunity.mods[0]._id,
        $pull: {
          mods: foundCommunity.mods[0]._id,
          members: foundUser?._id,
        },
      });
    } else {
      await foundCommunity.remove();
    }

    await foundUser.updateOne({ $pull: { communities: foundCommunity._id } });

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
    me: {
      type: UserType,
      resolve: async ({ userId }, _, context) =>
        await UserLoader.load(context, userId),
    },
  }),
});
