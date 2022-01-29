import { graphql } from 'graphql';

import {
  clearDatabaseAndRestartCounters,
  connectWithMongoose,
  disconnectWithMongoose,
} from '../../../../test';
import { schema } from '../../../schema/schema';

import { createUser } from '../fixtures/createUser';

beforeAll(connectWithMongoose);
beforeEach(clearDatabaseAndRestartCounters);
afterAll(disconnectWithMongoose);

it('should login with a registered user', async () => {
  const { username } = await createUser({
    username: 'noghartt',
    password: '123abcAd9=D',
  });

  const mutation = `
    mutation UserLoginMutation($username: String!, $password: String!) {
      userLoginMutation(input: {username: $username, password: $password}) {
        token
        me {
          id
        }
      }
    }
  `;

  const variableValues = {
    username,
    password: '123abcAd9=D',
  };

  const result = await graphql({
    schema,
    source: mutation,
    variableValues,
  });

  expect(result.errors).toBeUndefined();

  // TODO: Remove this @ts-ignore fixing the type
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const { token, me } = result?.data?.userLoginMutation;

  expect(me.id).toBeDefined();
  expect(token).toBeDefined();
});

it("should display error if username isn't exists", async () => {
  await createUser();

  const mutation = `
    mutation UserLoginMutation($username: String!, $password: String!) {
      userLoginMutation(input: {username: $username, password: $password}) {
        token
      }
    }
  `;

  const variableValues = {
    username: 'noghartt',
    password: '123abcAd9=D',
  };

  const result = await graphql({
    schema,
    source: mutation,
    variableValues,
  });

  expect(result.data?.userLoginMutation).toBeNull();

  expect(result.errors).toBeDefined();
  expect(result.errors[0].message).toBe(
    'This user was not registered. Please, try again!',
  );
});

it('should display error if password is incorrect', async () => {
  await createUser({ username: 'noghartt' });

  const mutation = `
    mutation UserLoginMutation($username: String!, $password: String!) {
      userLoginMutation(input: {username: $username, password: $password}) {
        token
      }
    }
  `;

  const variableValues = {
    username: 'noghartt',
    password: '123abcAd9=',
  };

  const result = await graphql({
    schema,
    source: mutation,
    variableValues,
  });

  expect(result.data?.userLoginMutation).toBeNull();

  expect(result.errors).toBeDefined();
  expect(result.errors[0].message).toBe(
    'This password is incorrect. Please, try again!',
  );
});
