import UnAuthError from '../errors/un-auth-error';
import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

interface SessionRequest extends Request {
  user?: string | JwtPayload;
}

const extractBearerToken = (header: string) => header.replace('Bearer ', '');

const auth = (req: SessionRequest, res: Response, next: NextFunction) => {
  const authorization = req.cookies['access-token'];
  if (!authorization) return next(new UnAuthError('Необходима авторизация'));

  const token = extractBearerToken(authorization);
  let payload;

  try {
    payload = jwt.verify(token, 'super-strong-secret');
    res.locals.user = payload;
    next();
  } catch (err) {
    return next(new UnAuthError('Необходима авторизация'));
  }
};
export default auth;
