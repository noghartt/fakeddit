import dotenv from 'dotenv';

dotenv.config();

const { PORT, NODE_ENV } = process.env;

export const config = {
  NODE_ENV,
  PORT: PORT || 3000,
};
