import { GraphQLObjectType } from 'graphql';

import { nodeField, nodesField } from '../modules/graphql/typeRegister';
import { version } from '../modules/common/queries';
import { me } from '../modules/user/queries';

export const QueryType = new GraphQLObjectType({
  name: 'Query',
  description: 'Root of queries',
  fields: () => ({
    node: nodeField,
    nodes: nodesField,
    me,
    version,
  }),
});
