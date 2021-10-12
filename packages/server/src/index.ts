import { createServer } from 'http';

import { config } from './environment';
import app from './app';

const bootstrap = async () => {
  const server = createServer(app.callback());

  server.listen(config.PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Running at ${config.PORT} port...`);
  });
};

bootstrap();
