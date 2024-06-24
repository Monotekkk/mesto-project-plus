import { Request, Response, NextFunction } from 'express';

interface IError {
  statusCode: number,
    message: string,
}

const errorsMiddleware = (err: IError, req: Request, res: Response, next: NextFunction) => {
  const { statusCode = 500, message } = err;

  res
    .status(statusCode)
    .send({
      message: statusCode === 500 ? 'Произошла непредвиденная ошибка' : message,
    });

  next();
};

export default errorsMiddleware;
