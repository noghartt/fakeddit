import jwt from 'jsonwebtoken';

import { Maybe } from '@fakeddit/types';

import { UserModel, UserDocument } from './modules/user/UserModel';
import { config } from './environment';

export const getUser = async (
  token: Maybe<string>,
): Promise<Maybe<UserDocument>> => {
  if (!token) return null;

  // TODO: Maybe it should be a crime
  [, token] = token.split('JWT ');

  const decodedToken = jwt.verify(token, config.JWT_SECRET) as { id: string };

  const user = await UserModel.findOne({ _id: decodedToken.id });

  if (!user) return null;

  return user;
};

export const generateJwtToken = (userId: string) =>
  `JWT ${jwt.sign({ id: userId }, config.JWT_SECRET)}`;
