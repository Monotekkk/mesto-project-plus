import { Request, Response, NextFunction } from 'express';

interface IError {
    status: number,
    message: string,
}

const errorsMiddleware = (err: IError, req: Request, res: Response, next: NextFunction) => {
  const { status = 500, message } = err;

  res
    .status(status)
    .send({
      message: status === 500 ? 'Произошла непредвиденная ошибка' : message,
    });

  next();
};

export default errorsMiddleware;
