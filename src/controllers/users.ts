import { Response, Request } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
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
      if (!user) {
        res.status(404).send('Ошибка 404: Пользователь по указанному _id не найден');
      }
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send('Ошибка 400: Переданы некорректные данные при создании пользователя');
      } else if (err.name === 'ValidationError') {
        res.status(400).send(err.message);
      } else {
        res.status(500).send('Ошибка 500: Ошибка по умолчанию');
      }
    });
};
export const createUser = (req: Request, res: Response) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  return bcrypt.hash(password, 10)
    .then((hash:string) => User.create({
      name, about, avatar, email, password: hash,
    })).then((user) => {
      res.status(201).send(user);
    }).catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send('Ошибка 400: Переданы некорректные данные при создании пользователя');
      } else if (err.name === 'ValidationError') {
        res.status(400).send(err.message);
      } else {
        res.status(500).send('Ошибка 500: Ошибка по умолчанию');
      }
    });
};
export const updateProfile = (req: Request, res: Response) => {
  const {
    name, about,
  } = req.body;
  User.findByIdAndUpdate(req.body.user._id, { name, about }, { new: true, runValidators: true })
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
      } else if (err.name === 'ValidationError') {
        res.status(400).send(err.message);
      } else {
        res.status(500).send('Ошибка 500: Ошибка по умолчанию');
      }
    });
};
export const updateAvatar = (req: Request, res: Response) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.body.user._id, { avatar }, { new: true, runValidators: true })
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
      } else if (err.name === 'ValidationError') {
        res.status(400).send(err.message);
      } else {
        res.status(500).send('Ошибка 500: Ошибка по умолчанию');
      }
    });
};
export const login = (req: Request, res: Response) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        'some-secret-key',
        { expiresIn: '7d' },
      );


      res.cookie('access-token', `Bearer ${token}`, {
        maxAge: 1000 * 60 * 15,
        httpOnly: true,
        sameSite: 'strict',
      });
      res.status(201).send(token);
      //res.status(201).send({ success: 'true' });
    })
    .catch((err) => {
      res.status(401).send({ message: err.message });
    });
};
export const getUser = (req: Request, res:Response) =>{
 return getUsers(req, res);
}