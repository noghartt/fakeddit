import { Maybe } from '@fakeddit/types';

import { UserDocument } from '../user/UserModel';
import { DataLoaders } from '../graphql/loaderRegister';

export type GraphQLContext = {
  user?: Maybe<UserDocument>;
  dataloaders?: DataLoaders;
};
