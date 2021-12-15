import { Maybe } from '@fakeddit/types';

import { UserDocument } from '../user/UserModel';

export type GraphQLContext = {
  user?: Maybe<UserDocument>;
};
