import { GraphQLString, GraphQLNonNull } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';

import { GraphQLContext } from '../../graphql/types';

import { UserType } from '../../user/UserType';
import { UserModel } from '../../user/UserModel';
import UserLoader from '../../user/UserLoader';

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
    if (!ctx.user) {
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

    const foundUser = await UserModel.findById(ctx?.user._id);

    const community = new CommunityModel({
      ...rest,
      name: communityId,
      admin: foundUser,
      members: foundUser,
    });

    await Promise.all([
      community.save(),
      foundUser?.updateOne({
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
    me: {
      type: UserType,
      resolve: async ({ userId }, _, context) =>
        await UserLoader.load(context, userId),
    },
  }),
});
