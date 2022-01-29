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

  const result = await graphql({
    schema,
    source: query,
    contextValue: getContext({ user }),
  });

  expect(result.errors).toBeUndefined();

  // TODO: Remove this @ts-ignore fixing the type
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const { id } = result?.data?.me;

  expect(id).toBeDefined();
});
