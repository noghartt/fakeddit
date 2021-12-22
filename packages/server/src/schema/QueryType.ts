import { GraphQLObjectType } from 'graphql';

import { version } from '../modules/common/queries';
import { nodeField, nodesField } from '../modules/graphql/typeRegister';

export const QueryType = new GraphQLObjectType({
  name: 'Query',
  description: 'Root of queries',
  fields: () => ({
    node: nodeField,
    nodes: nodesField,
    version,
  }),
});
