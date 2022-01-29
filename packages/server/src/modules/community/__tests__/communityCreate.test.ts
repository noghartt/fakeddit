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
    displayName: 'A community to lovers of tests',
    communityId: 'WeLoveTests',
  };

  const result = await graphql({
    schema,
    source: mutation,
    contextValue: getContext({ user }),
    variableValues,
  });

  expect(result.errors).toBeUndefined();

  // TODO: Remove this @ts-ignore fixing the type
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const { community } = result?.data?.communityCreate;

  expect(community.id).toBeDefined();
  expect(community.name).toBe(variableValues.communityId);
  expect(community.displayName).toBe(variableValues.displayName);
  expect(community.members.edges).toHaveLength(1);

  const membersId = community.members.edges.map(
    edge => fromGlobalId(edge.node.id).id,
  );

  expect(membersId).toContain(user._id.toString());
});

it("should not allow create a community if doesn't have authorization header", async () => {
  const mutation = `
    mutation M($displayName: String!, $communityId: String!) {
      communityCreate(
        input: { displayName: $displayName, communityId: $communityId }
      ) {
        community {
          id
        }
      }
    }
  `;

  const variableValues = {
    displayName: 'A community to lovers of tests',
    communityId: 'WeLoveTests',
  };

  const result = await graphql({ schema, source: mutation, variableValues });

  console.log(result);

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
        }
      }
    }
  `;

  const variableValues = {
    displayName: 'A community to lovers of tests',
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

  expect(result?.data?.communityCreate).toBeNull();

  expect(result?.errors).toBeDefined();
  expect(result.errors && result.errors[0].message).toBe(
    'A community with this name has already been created. Please, try again!',
  );
});
