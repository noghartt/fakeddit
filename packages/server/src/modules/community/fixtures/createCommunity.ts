import { DeepPartial } from '@fakeddit/types';

import { UserModel, UserDocument } from '../../user/UserModel';
import { createUser } from '../../user/fixtures/createUser';

import { getCounter } from '../../../../test/counters';
import { upsertModel } from '../../../../test/upsertModel';

import { CommunityModel, Community } from '../CommunityModel';

export const createCommunity = async (
  args?: Omit<DeepPartial<Community>, 'admin' | 'mods' | 'members'>,
) => {
  const i = getCounter('community');

  const user = await upsertModel<UserDocument, typeof createUser>(
    UserModel,
    createUser,
  );

  const community = await new CommunityModel({
    name: `community#${i}`,
    displayName: `MockedCommunity#${i}`,
    ...args,
    admin: user._id,
    members: [user._id],
  }).save();

  await user.updateOne({ $addToSet: { communities: community._id } });

  return community;
};
