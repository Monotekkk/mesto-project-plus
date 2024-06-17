import {Response, Request} from 'express';
import User from '../models/user';

export const getUsers = (req: Request, res: Response) => {
  User.find({})
    .then((users) => {
      res.send({ data: users });
    })
    .catch(() => res.status(500)
      .send({ message: 'Произошла ошибка' }));
};
export const getUserByID = (req: Request, res: Response) => {
  User.findById(req.params.id).then((user) => {
    res.send({ data: user });
  });
};
export const createUser = (req: Request, res: Response) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar }).then((user) => {
    res.send({ data: user });
  });
};
