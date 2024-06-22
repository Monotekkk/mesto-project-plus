import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

interface SessionRequest extends Request {
    user?: string | JwtPayload;
}

const handleAuthError = (res: Response) => {
  res
    .status(401)
    .send({ message: 'Необходима авторизация' });
};

const extractBearerToken = (header: string) => header.replace('Bearer ', '');

const auth = (req: SessionRequest, res: Response, next: NextFunction) => {
  const authorization = req.cookies['access-token'];
  if (!authorization) {
    return handleAuthError(res);
  }

  const token = extractBearerToken(authorization);
  let payload;

  try {
    payload = jwt.verify(token, 'super-strong-secret');
  } catch (err) {
    return handleAuthError(res);
  }

  req.user = payload;

  next();
};
export default auth;
