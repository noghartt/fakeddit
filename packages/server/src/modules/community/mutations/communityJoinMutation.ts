import { GraphQLString, GraphQLNonNull } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';

import { GraphQLContext } from '../../graphql/types';

import { UserType } from '../../user/UserType';
import { UserModel } from '../../user/UserModel';
import UserLoader from '../../user/UserLoader';

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

    const foundUser = await UserModel.findById(ctx.user?._id);

    if (
      community.members.includes(foundUser?._id) ||
      foundUser?.communities.includes(community._id)
    ) {
      throw new Error('You are already a member of this community.');
    }

    await Promise.all([
      community.updateOne({
        $addToSet: { members: [...community.members, foundUser?._id] },
      }),
      foundUser?.updateOne({
        $addToSet: {
          communities: [...(foundUser?.communities || []), community._id],
        },
      }),
    ]);

    return {
      userId: foundUser?._id,
      communityId: community._id,
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
