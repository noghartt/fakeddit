import { graphql } from 'graphql';

import {
  clearDatabaseAndRestartCounters,
  connectWithMongoose,
  disconnectWithMongoose,
} from '../../../../test';
import { schema } from '../../../schema/schema';

import { createUser } from '../../user/fixtures/createUser';

beforeAll(connectWithMongoose);
beforeEach(clearDatabaseAndRestartCounters);
afterAll(disconnectWithMongoose);

it('should create a new community', async () => {
  const user = await createUser();

  const mutation = `
    mutation M($displayName: String!, $communityId: String!) {
      communityCreate(
        input: { displayName: $displayName, communityId: $communityId }
      ) {
        community {
          id
          name
          displayName
          members
        }
      }
    }
  `;

  const rootValue = {};

  const variables = {
    displayName: 'A community to lovers of tests',
    communityId: 'WeLoveTests',
  };

  const result = await graphql(
    schema,
    mutation,
    rootValue,
    { user },
    variables,
  );

  expect(result.errors).toBeUndefined();

  const { community } = result?.data?.communityCreate;

  expect(community.id).toBeDefined();
  expect(community.name).toBe(variables.communityId);
  expect(community.displayName).toBe(variables.displayName);
  expect(community.members).toHaveLength(1);
  expect(community.members).toContain(user._id.toString());
});

it("should not allow create a community if doesn't have authorization header", async () => {
  const mutation = `
    mutation M($displayName: String!, $communityId: String!) {
      communityCreate(
        input: { displayName: $displayName, communityId: $communityId }
      ) {
        community {
          id
          name
          displayName
          members
        }
      }
    }
  `;

  const rootValue = {};

  const variables = {
    displayName: 'A community to lovers of tests',
    communityId: 'WeLoveTests',
  };

  const result = await graphql(schema, mutation, rootValue, {}, variables);

  expect(result?.data?.communityCreate).toBeNull();

  expect(result?.errors).toBeDefined();
  expect(result.errors && result.errors[0]?.message).toBe(
    'You are not logged in. Please, try again!',
  );
});

it('should not create a duplicate community', async () => {
  const user = await createUser();

  const mutation = `
    mutation M($displayName: String!, $communityId: String!) {
      communityCreate(
        input: { displayName: $displayName, communityId: $communityId }
      ) {
        community {
          id
          name
          displayName
          members
        }
      }
    }
  `;

  const rootValue = {};

  const variables = {
    displayName: 'A community to lovers of tests',
    communityId: 'WeLoveTests',
  };

  await graphql(schema, mutation, rootValue, { user }, variables);
  const result = await graphql(
    schema,
    mutation,
    rootValue,
    { user },
    variables,
  );

  expect(result?.data?.communityCreate).toBeNull();

  expect(result?.errors).toBeDefined();
  expect(result.errors && result.errors[0].message).toBe(
    'A community with this name has already been created. Please, try again!',
  );
});
