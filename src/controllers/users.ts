import { Response, Request } from 'express';
import User from '../models/user';

export const getUsers = (req: Request, res: Response) => {
  User.find({})
    .then((users) => {
      res.send({ data: users });
    })
    .catch(() => {
      res.status(500).send('Ошибка 500: Ошибка по умолчанию');
    });
};
export const getUserByID = (req: Request, res: Response) => {
  User.findById(req.params.id)
    .then((user) => {
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(404).send('Ошибка 404: Пользователь по указанному _id не найден');
      } else {
        res.status(500).send('Ошибка 500: Ошибка по умолчанию');
      }
    });
};
export const createUser = (req: Request, res: Response) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar }).then((user) => {
    res.send({ user });
  }).catch((err) => {
    if (err.name === 'CastError') {
      res.status(400).send('Ошибка 400: Переданы неккоректные данные при создании пользователя');
    } else {
      res.status(500).send('Ошибка 500: Ошибка по умолчанию');
    }
  });
};
export const updateProfile = (req: Request, res: Response) => {
  const {
    name, about, avatar, _id,
  } = req.body;
  User.findByIdAndUpdate(_id, { name, about, avatar }).then((user) => {
    res.send({ user });
  });
};
export const updateAvatar = (req: Request, res: Response) => {
  const { avatar, _id } = req.body;
  User.findByIdAndUpdate(_id, { avatar }, { new: true }).then((user) => {
    res.send({ user });
  });
};
