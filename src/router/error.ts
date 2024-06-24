import NotFoundError from "../errors/not-found-error";
import { NextFunction, Request, Response } from "express";

const notFoundRoute = (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    next(new NotFoundError('Страница не найдена'));
  };

  export default notFoundRoute;