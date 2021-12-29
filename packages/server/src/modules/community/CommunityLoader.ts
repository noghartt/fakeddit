import { createLoader, NullConnection } from '@entria/graphql-mongo-helpers';

import { registerLoader } from '../graphql/loaderRegister';

import { CommunityModel } from './CommunityModel';

const Loader = createLoader({
  model: CommunityModel,
  loaderName: 'CommunityLoader',
  shouldValidateContextUser: true,
  viewerCanSee: (context, data) => (context?.user ? data : NullConnection),
});

export default Loader;
export const { Wrapper: User, getLoader, clearCache, load, loadAll } = Loader;

registerLoader('CommunityLoader', getLoader);
