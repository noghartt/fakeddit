import { graphql } from 'graphql';

import {
  clearDatabaseAndRestartCounters,
  connectWithMongoose,
  disconnectWithMongoose,
} from '../../../../test';
import { schema } from '../../../schema/schema';
import { getContext } from '../../../getContext';

import { createUser } from '../fixtures/createUser';

beforeAll(connectWithMongoose);
beforeEach(clearDatabaseAndRestartCounters);
afterAll(disconnectWithMongoose);

it('should get the user', async () => {
  const user = await createUser();

  const query = `
    query me {
      me {
        id
      }
    }
  `;

  const rootValue = {};

  const result = await graphql(
    schema,
    query,
    rootValue,
    getContext({ user }),
    {},
  );

  expect(result.errors).toBeUndefined();

  const { id } = result?.data?.me;

  expect(id).toBeDefined();
});
