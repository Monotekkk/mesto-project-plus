import { Response, Request } from 'express';
import User from '../models/user';

export const getUsers = (req: Request, res: Response) => {
  User.find({})
    .then((users) => {
      res.send(users);
    })
    .catch(() => {
      res.status(500).send('Ошибка 500: Ошибка по умолчанию');
    });
};
export const getUserByID = (req: Request, res: Response) => {
  User.findById(req.params.id)
    .then((user) => {
      res.send(user);
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
    res.send(user);
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
    name, about,
  } = req.body;
  User.findByIdAndUpdate(req.body.user._id, { name, about })
    .then((user) => {
      if (!user) {
        res.status(404).send('Ошибка 404: Пользователь с указанным _id не найден');
      }
    })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send('Ошибка 400: Переданы некорректные данные при обновлении профиля');
      } else {
        res.status(500).send('Ошибка 500: Ошибка по умолчанию');
      }
    });
};
export const updateAvatar = (req: Request, res: Response) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.body.user._id, { avatar }, { new: true })
    .then((user) => {
      if (!user) {
        res.status(404).send('Ошибка 404: Пользователь с указанным _id не найден');
      }
    })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send('Ошибка 400: Переданы некорректные данные при обновлении аватара');
      } else {
        res.status(500).send('Ошибка 500: Ошибка по умолчанию');
      }
    });
};