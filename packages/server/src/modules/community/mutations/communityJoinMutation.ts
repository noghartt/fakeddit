import { GraphQLString, GraphQLNonNull } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';

import { GraphQLContext } from '../../graphql/types';

import { UserModel } from '../../user/UserModel';

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

    const foundMemberIdInCommuntiy = community.members.includes(foundUser?._id);
    const foundCommuntiyIdInUser = foundUser?.communities.includes(
      community._id,
    );

    if (foundMemberIdInCommuntiy || foundCommuntiyIdInUser) {
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
  }),
});
