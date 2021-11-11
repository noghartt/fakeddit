import { graphql } from 'graphql';

import {
  clearDatabaseAndRestartCounters,
  connectWithMongoose,
  disconnectWithMongoose,
} from '../../../../test';
import { schema } from '../../../schema';

beforeAll(connectWithMongoose);
beforeEach(clearDatabaseAndRestartCounters);
afterAll(disconnectWithMongoose);

it('should create a new user', async () => {
  const mutation = `
      mutation M($username: String!, $displayName: String!, $email: String!, $password: String!) {
        userRegisterMutation(input: {username: $username, displayName: $displayName, email: $email, password: $password}) {
          user {
            id
            username
            displayName
            email
            password
          }
        }
      }
    `;

  const rootValue = {};

  const variables = {
    username: 'noghartt',
    displayName: 'Noghartt',
    email: 'john@doe.com',
    password: '123abcAd9=D',
  };

  const result = await graphql(schema, mutation, rootValue, {}, variables);

  expect(result.errors).toBeUndefined();

  const { user } = result?.data?.userRegisterMutation;

  expect(user.id).toBeDefined();
});
