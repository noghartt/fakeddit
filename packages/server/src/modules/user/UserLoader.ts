import { createLoader, NullConnection } from '@entria/graphql-mongo-helpers';

import { registerLoader } from '../graphql/loaderRegister';

import { UserModel } from './UserModel';

const Loader = createLoader({
  model: UserModel,
  loaderName: 'UserLoader',
  shouldValidateContextUser: true,
  viewerCanSee: (context, data) => (context?.user ? data : NullConnection),
});

export default Loader;
export const { Wrapper: User, getLoader, clearCache, load, loadAll } = Loader;

registerLoader('UserLoader', getLoader);
