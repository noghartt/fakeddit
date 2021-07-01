import path from 'path';
import dotenv from 'dotenv-safe';

const root = path.join.bind(process.cwd());

dotenv.config({
  path: root('.env'),
});

const { NODE_ENV, PORT } = process.env;

export default {
  NODE_ENV,
  PORT: PORT || 3000,
};
