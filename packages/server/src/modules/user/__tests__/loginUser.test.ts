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

const ROOT_VALUE = {};

beforeEach(async () => {
  const mutation = `
      mutation M($username: String!, $displayName: String!, $email: String!, $password: String!) {
        userRegisterMutation(input: {username: $username, displayName: $displayName, email: $email, password: $password}) {
          me {
            id
            username
            displayName
            email
          }
        }
      }
    `;

  const variables = {
    username: 'noghartt',
    displayName: 'Noghartt',
    email: 'john@doe.com',
    password: '123abcAd9=D',
  };

  await graphql(schema, mutation, ROOT_VALUE, {}, variables);
});

const mutation = `
mutation UserLoginMutation($username: String!, $password: String!) {
  userLoginMutation(input: {username: $username, password: $password}) {
    token
    me {
      id
      username
      displayName
      email
    }
  }
}
`;

it('should login with a registered user', async () => {
  const variables = {
    username: 'noghartt',
    password: '123abcAd9=D',
  };

  const result = await graphql(schema, mutation, ROOT_VALUE, {}, variables);

  expect(result.errors).toBeUndefined();

  const { token, me } = result?.data?.userLoginMutation;

  expect(me.id).toBeDefined();
  expect(token).toBeDefined();
});

it("should display error if username isn't exists", async () => {
  const variables = {
    username: 'nogharttt',
    password: '123abcAd9=D',
  };

  const result = await graphql(schema, mutation, ROOT_VALUE, {}, variables);

  expect(result.data?.userLoginMutation).toBeNull();

  expect(result.errors).toBeDefined();
  expect(result.errors[0].message).toBe(
    'This user was not registered. Please, try again!',
  );
});

it('should display error if password is incorrect', async () => {
  const variables = {
    username: 'noghartt',
    password: '123abcAd9=',
  };

  const result = await graphql(schema, mutation, ROOT_VALUE, {}, variables);

  expect(result.data?.userLoginMutation).toBeNull();

  expect(result.errors).toBeDefined();
  expect(result.errors[0].message).toBe(
    'This password is incorrect. Please, try again!',
  );
});
