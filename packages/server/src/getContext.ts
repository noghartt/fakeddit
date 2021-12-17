import { Maybe } from '@fakeddit/types';

import { UserDocument } from './modules/user/UserModel';
import { getAllDataLoaders } from './modules/graphql/loaderRegister';
import { GraphQLContext } from './modules/graphql/types';

type ContextVars = {
  user?: Maybe<UserDocument>;
};

export const getContext = (ctx?: ContextVars): GraphQLContext => {
  const dataloaders = getAllDataLoaders();

  return {
    dataloaders,
    user: ctx?.user || null,
  };
};
