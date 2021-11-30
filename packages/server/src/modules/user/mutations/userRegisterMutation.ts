import { GraphQLString, GraphQLNonNull } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';

import { UserModel } from '../UserModel';
import { UserType } from '../UserType';

import { generateJwtToken } from '../../../auth';

export const userRegisterMutation = mutationWithClientMutationId({
  name: 'UserRegister',
  inputFields: {
    username: { type: new GraphQLNonNull(GraphQLString) },
    displayName: { type: GraphQLString },
    email: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) },
  },
  mutateAndGetPayload: async ({ email, ...rest }) => {
    const hasUser =
      (await UserModel.countDocuments({ email: email.trim() })) > 0;

    if (hasUser) {
      throw new Error('This email has been registered. Please try again!');
    }

    const user = new UserModel({
      ...rest,
      email,
    });

    await user.save();

    const token = generateJwtToken(user._id);

    return {
      id: user._id,
      sucess: 'Congratulations! The user has registered with success!',
      token,
    };
  },
  outputFields: {
    token: {
      type: GraphQLString,
      resolve: ({ token }) => token,
    },
    me: {
      type: UserType,
      resolve: async ({ id }) => await UserModel.findById(id),
    },
  },
});
