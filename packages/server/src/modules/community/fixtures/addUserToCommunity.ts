import { UserDocument } from '../../user/UserModel';

import { CommunityDocument } from '../CommunityModel';

export const addUserToCommunity = async (
  user: UserDocument,
  community: CommunityDocument,
) => {
  await user.updateOne({ $addToSet: { communities: community._id } });
  await community.updateOne({ $addToSet: { members: user._id } });
};
