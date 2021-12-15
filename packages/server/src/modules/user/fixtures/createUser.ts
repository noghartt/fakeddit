import { DeepPartial } from '@fakeddit/types';

import { getCounter } from '../../../../test/counters';

import { UserModel, User, UserDocument } from '../UserModel';

export const createUser = async (
  args?: DeepPartial<User>,
): Promise<UserDocument> => {
  const i = getCounter('user');

  return new UserModel({
    username: `user#${i}`,
    email: `user#${i}@example.com`,
    password: `password#${i}`,
    ...args,
  }).save();
};
