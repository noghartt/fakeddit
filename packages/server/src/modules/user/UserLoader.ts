import { createLoader } from '@entria/graphql-mongo-helpers';

import { registerLoader } from '../graphql/loaderRegister';

import { UserModel } from './UserModel';

const UserLoader = createLoader({
  model: UserModel,
  loaderName: 'UserLoader',
  shouldValidateContextUser: true,
});

export default UserLoader;
export const {
  Wrapper: User,
  getLoader,
  clearCache,
  load,
  loadAll,
} = UserLoader;

registerLoader('UserLoader', getLoader);
