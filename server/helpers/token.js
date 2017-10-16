import jwt from 'jwt-simple';
import { mongoConfig } from '../config';

export function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, mongoConfig.secret);
}
