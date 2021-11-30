import dotenv from 'dotenv';

dotenv.config();

const { PORT, NODE_ENV, MONGO_URI, JWT_SECRET } = process.env;

export const config = {
  NODE_ENV,
  PORT: PORT || 3000,
  MONGO_URI,
  JWT_SECRET,
};
