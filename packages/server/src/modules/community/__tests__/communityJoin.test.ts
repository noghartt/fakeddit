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

beforeAll(connectWithMongoose);
beforeEach(clearDatabaseAndRestartCounters);
afterAll(disconnectWithMongoose);

it('should join a created community', async () => {
  await createCommunity({ name: 'WeLoveTests' });
  const user = await createUser();

  const mutation = `
    mutation M($communityId: String!) {
      communityJoin(input: { communityId: $communityId }) {
        community {
          id
          members(first: 10) {
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

  const variableValues = {
    communityId: 'WeLoveTests',
  };

  const contextValue = getContext({ user });

  const result = await graphql({
    schema,
    source: mutation,
    contextValue,
    variableValues,
  });

  expect(result.errors).toBeUndefined();

  // TODO: Remove this @ts-ignore fixing the type
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const { community } = result?.data?.communityJoin;

  expect(community.members.edges).toHaveLength(2);

  const membersId = community.members.edges.map(
    edge => fromGlobalId(edge.node.id).id,
  );

  expect(membersId).toContain(user._id.toString());
});

it("should not allow to join a community if doesn't have authorization header", async () => {
  const mutation = `
    mutation M($communityId: String!) {
      communityJoin(input: { communityId: $communityId }) {
        community {
          id
        }
      }
    }
  `;

  const variableValues = {
    communityId: 'WeLoveTests',
  };

  const contextValue = getContext();

  const result = await graphql({
    schema,
    source: mutation,
    contextValue,
    variableValues,
  });

  expect(result?.data?.communityJoin).toBeNull();

  expect(result?.errors).toBeDefined();
  expect(result.errors && result.errors[0].message).toBe(
    'You are not logged in. Please, try again!',
  );
});

it('should not join a non-existent community', async () => {
  const user = await createUser();

  const mutation = `
    mutation M($communityId: String!) {
      communityJoin(input: { communityId: $communityId }) {
        community {
          id
        }
      }
    }
  `;

  const variableValues = {
    communityId: 'WeLoveTestsButThisCommunityDoesntExist',
  };

  const contextValue = getContext({ user });

  await graphql({
    schema,
    source: mutation,
    contextValue,
    variableValues,
  });

  const result = await graphql({
    schema,
    source: mutation,
    contextValue,
    variableValues,
  });

  expect(result?.data?.communityJoin).toBeNull();

  expect(result?.errors).toBeDefined();
  expect(result.errors && result.errors[0].message).toBe(
    "This community doesn't exist. Please, try again.",
  );
});

it('should not join a community that you already is a member', async () => {
  await createCommunity({ name: 'WeLoveTests' });
  const user = await createUser();

  const mutation = `
    mutation M($communityId: String!) {
      communityJoin(input: { communityId: $communityId }) {
        community {
          id
        }
      }
    }
  `;

  const variableValues = {
    communityId: 'WeLoveTests',
  };

  const contextValue = getContext({ user });

  await graphql({
    schema,
    source: mutation,
    contextValue,
    variableValues,
  });

  const result = await graphql({
    schema,
    source: mutation,
    contextValue,
    variableValues,
  });

  expect(result?.data?.communityJoin).toBeNull();

  expect(result?.errors).toBeDefined();
  expect(result.errors && result.errors[0].message).toBe(
    'You are already a member of this community.',
  );
});
