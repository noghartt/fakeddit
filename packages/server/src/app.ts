import Koa from 'koa';
import Router from 'koa-router';
import bodyparser from 'koa-bodyparser';
import GraphQLHTTP from 'koa-graphql';

import { schema } from './schema';
import { config } from './environment';

const app = new Koa();
const router = new Router();

const graphQlSettingsPerReq = async (): Promise<GraphQLHTTP.OptionsData> => ({
  graphiql: config.NODE_ENV !== 'production',
  schema,
  formatError: ({ message, locations, stack }) => {
    /* eslint-disable no-console */
    console.log(message);
    console.log(locations);
    console.log(stack);
    /* eslint-enable no-console */

    return {
      message,
      locations,
      stack,
    };
  },
});

const graphQlServer = GraphQLHTTP(graphQlSettingsPerReq);

router.all('/graphql', graphQlServer);

app.use(bodyparser());
app.use(router.routes()).use(router.allowedMethods());

export default app;
