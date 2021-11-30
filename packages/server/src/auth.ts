import jwt from 'jsonwebtoken';

import { config } from './environment';

export const generateJwtToken = (userId: string) =>
  `JWT ${jwt.sign({ id: userId }, config.JWT_SECRET)}`;
