import Koa from 'koa';
import Router from '@koa/router';
import bodyparser from 'koa-bodyparser';
import { graphqlHTTP, OptionsData } from 'koa-graphql';
import cors from '@koa/cors';

import { schema } from './schema';
import { config } from './environment';

const app = new Koa();
const router = new Router();

const graphQlSettingsPerReq = async (): Promise<OptionsData> => ({
  graphiql:
    config.NODE_ENV !== 'production'
      ? {
          headerEditorEnabled: true,
          shouldPersistHeaders: true,
        }
      : false,
  schema,
  pretty: true,
  customFormatErrorFn: ({ message, locations, stack }) => {
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

const graphQlServer = graphqlHTTP(graphQlSettingsPerReq);

router.all('/graphql', graphQlServer);

app.use(cors());
app.use(bodyparser());
app.use(router.routes()).use(router.allowedMethods());

export default app;
