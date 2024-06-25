import { Response, Request, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user';
import NotFoundError from '../errors/not-found-error';
import BadRequestError from '../errors/bad-request-error';
import ConflictError from '../errors/conflict-error';
import UnAuthError from '../errors/un-auth-error';

export const getUsers = (req: Request, res: Response, next: NextFunction) => {
  User.find({})
    .then((users) => {
      res.send(users);
    })
    .catch(next);
};
export const getUserByID = (req: Request, res: Response, next: NextFunction) => {
  const _id = req.params.id === undefined ? res.locals.user._id : req.params.id;
  User.findById(_id)
    .then((user) => {
      if (!user) throw new NotFoundError('Ошибка 404: Пользователь по указанному _id не найден');
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') return next(new BadRequestError('Переданы некорректные данные.'));
      return next(err);
    });
};
export const createUser = (req: Request, res: Response, next: NextFunction) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  return bcrypt.hash(password, 10)
    .then((hash: string) => User.create({
      name, about, avatar, email, password: hash,
    })).then((user) => {
      res.status(201).send(user);
    }).catch((err) => {
      if (err.name === 'ValidationError') return next(new BadRequestError(err.message));
      if (err.code === 11000) return next(new ConflictError('Такой пользователь уже существует'));
      return next(err);
    });
};
export const updateProfile = (req: Request, res: Response, next: NextFunction) => {
  const {
    name, about,
  } = req.body;
  User.findByIdAndUpdate(res.locals.user._id, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {throw new NotFoundError('Ошибка 404: Пользователь с указанным _id не найден')} else {
        res.send(user);
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') return next(new BadRequestError(err.message));
      return next(err);
    });
};
export const updateAvatar = (req: Request, res: Response, next: NextFunction) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(res.locals.user._id, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {throw new NotFoundError('Ошибка 404: Пользователь с указанным _id не найден')}else{
        res.send(user);
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') return next(new BadRequestError(err.message));
      return next(err);
    });
};
export const login = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        'super-strong-secret',
        { expiresIn: '7d' },
      );

      res.cookie('access-token', `Bearer ${token}`, {
        maxAge: 1000 * 60 * 15,
        httpOnly: true,
        sameSite: 'strict',
      });
      res.status(201).send({ success: 'true' });
    })
    .catch((err) => {
      return next(err);
    });
};
