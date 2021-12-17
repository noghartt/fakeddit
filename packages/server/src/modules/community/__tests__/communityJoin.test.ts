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
          members
        }
        me {
          id
          communities
        }
      }
    }
  `;

  const rootValue = {};

  const variables = {
    communityId: 'WeLoveTests',
  };

  const context = await getContext({ user });

  const result = await graphql(schema, mutation, rootValue, context, variables);

  expect(result.errors).toBeUndefined();

  const { community, me } = result?.data?.communityJoin;

  expect(me.communities).toHaveLength(1);
  expect(me.communities).toContain(fromGlobalId(community.id).id);

  expect(community.members).toHaveLength(2);
  expect(community.members).toContain(fromGlobalId(me.id).id);
});

it("should not allow to join a community if doesn't have authorization header", async () => {
  const mutation = `
    mutation M($communityId: String!) {
      communityJoin(input: { communityId: $communityId }) {
        me {
          id
        }
      }
    }
  `;

  const rootValue = {};

  const variables = {
    communityId: 'WeLoveTests',
  };

  const context = getContext();

  const result = await graphql(schema, mutation, rootValue, context, variables);

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
        me {
          id
        }
      }
    }
  `;

  const rootValue = {};

  const variables = {
    communityId: 'WeLoveTestsButThisCommunityDoesntExist',
  };

  const context = await getContext({ user });

  await graphql(schema, mutation, rootValue, context, variables);
  const result = await graphql(
    schema,
    mutation,
    rootValue,
    { user },
    variables,
  );

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
        me {
          id
        }
      }
    }
  `;

  const rootValue = {};

  const variables = {
    communityId: 'WeLoveTests',
  };

  const context = await getContext({ user });

  await graphql(schema, mutation, rootValue, context, variables);
  const result = await graphql(
    schema,
    mutation,
    rootValue,
    { user },
    variables,
  );

  expect(result?.data?.communityJoin).toBeNull();

  expect(result?.errors).toBeDefined();
  expect(result.errors && result.errors[0].message).toBe(
    'You are already a member of this community.',
  );
});
