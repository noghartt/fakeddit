import { graphql } from 'graphql';
import { fromGlobalId } from 'graphql-relay';

import {
  clearDatabaseAndRestartCounters,
  connectWithMongoose,
  disconnectWithMongoose,
} from '../../../../test';
import { schema } from '../../../schema/schema';
import { getContext } from '../../../getContext';

import { createUser } from '../../user/fixtures/createUser';

import { createCommunity } from '../fixtures/createCommunity';
import { addUserToCommunity } from '../fixtures/addUserToCommunity';

beforeAll(connectWithMongoose);
beforeEach(clearDatabaseAndRestartCounters);
afterAll(disconnectWithMongoose);

it('should exit a community', async () => {
  const createdCommunity = await createCommunity({ name: 'WeLoveTests' });
  const user = await createUser();

  await addUserToCommunity(user, createdCommunity);

  const mutation = `
    mutation M($communityName: String!) {
      communityExit(input: {communityName: $communityName}) {
        community {
          id
          members {
            edges {
              node {
                id
              }
            }
          }
        }
      }
    }
  `;

  const rootValue = {};

  const variables = {
    communityName: 'WeLoveTests',
  };

  const context = getContext({ user });

  const result = await graphql(schema, mutation, rootValue, context, variables);

  expect(result.errors).toBeUndefined();

  const { community } = result?.data?.communityExit;

  expect(community.members.edges).toHaveLength(1);

  const membersId = community.members.edges.map(
    edge => fromGlobalId(edge.node.id).id,
  );

  expect(membersId).not.toContain(user._id.toString());
});
