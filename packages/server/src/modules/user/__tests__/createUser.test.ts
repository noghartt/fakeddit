import { graphql } from 'graphql';

import {
  clearDatabaseAndRestartCounters,
  connectWithMongoose,
  disconnectWithMongoose,
} from '../../../../test';
import { schema } from '../../../schema/schema';

beforeAll(connectWithMongoose);
beforeEach(clearDatabaseAndRestartCounters);
afterAll(disconnectWithMongoose);

it('should create a new user', async () => {
  const mutation = `
      mutation M($username: String!, $displayName: String!, $email: String!, $password: String!) {
        userRegisterMutation(input: {username: $username, displayName: $displayName, email: $email, password: $password}) {
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

  const rootValue = {};

  const variableValues = {
    username: 'noghartt',
    displayName: 'Noghartt',
    email: 'john@doe.com',
    password: '123abcAd9=D',
  };

  const result = await graphql({
    schema,
    source: mutation,
    rootValue,
    variableValues,
  });

  expect(result.errors).toBeUndefined();

  // TODO: Remove this @ts-ignore fixing the type
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const { me, token } = result?.data?.userRegisterMutation;

  expect(token).toBeDefined();
  expect(me.id).toBeDefined();
});
