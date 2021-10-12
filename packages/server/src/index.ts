import { createServer } from 'http';

import { config } from './environment';
import { connectDatabase } from './database';
import app from './app';

const bootstrap = async () => {
  try {
    await connectDatabase();
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Unable to connect to database!', err);
    process.exit(1);
  }

  const server = createServer(app.callback());

  server.listen(config.PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Running at ${config.PORT} port...`);
  });
};

bootstrap();
