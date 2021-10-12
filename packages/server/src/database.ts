import mongoose from 'mongoose';

import { config } from './environment';

export const connectDatabase = async (): Promise<void> => {
  /* eslint-disable no-console */
  mongoose.connection
    .once('open', () => console.log('Connected with the database!'))
    .on('error', err => console.log(err))
    .on('close', () => console.log('Database connection was closed!'));
  /* eslint-enable no-console */

  await mongoose.connect(config.MONGO_URI);
};
