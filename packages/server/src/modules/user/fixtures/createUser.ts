import { DeepPartial } from '@fakeddit/types';

import { getCounter } from '../../../../test/counters';

import { UserModel, User } from '../UserModel';

export const createUser = async (args?: DeepPartial<User>) => {
  const i = getCounter('user');

  return new UserModel({
    username: `user#${i}`,
    email: `user#${i}@example.com`,
    password: `password#${i}`,
    ...args,
  }).save();
};
