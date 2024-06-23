import { NextFunction, Request, Response } from 'express';
import NotFoundError from '../errors/not-found-error';
import BadRequestError from '../errors/bad-request-error';
import ForbiddenError from '../errors/forbidden-error';
import Card from '../models/card';

export const createCard = (req: Request, res: Response, next: NextFunction) => {
  const {
    name,
    link,
  } = req.body;
  Card.create({
    name,
    link,
    owner: res.locals.user._id,
  })
    .then((card) => res.status(201).send(card))
    .catch((err) => {
      if (err.name === 'CastError') return next(new BadRequestError('Переданы некорректные данные при создании карточки'));
      if (err.name === 'ValidationError') return next(new BadRequestError(err.message));
    });
};

export const getCards = (req: Request, res: Response, next: NextFunction) => {
  Card.find()
    .then((cards) => {
      res.send(cards);
    })
    .catch(next);
};

export const deleteCards = (req: Request, res: Response, next: NextFunction) => {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (!card) return next(new NotFoundError('Карточка с указанным _id не найдена'));
      if (card.owner.toString() !== res.locals.user._id) return next(new ForbiddenError('Можно удалять только собственные карточки'));
      card.remove()
        .then(() => res.send(card));
    })
    .catch((err) => {
      if (err.name === 'CastError') return next(new BadRequestError('Переданы некорректные данные'));
      if (err.name === 'ValidationError') return next(new BadRequestError(err.message));
    });
};
export const likeCard = (req: Request, res: Response, next: NextFunction) => {
  Card.findByIdAndUpdate(req.params.cardId, {
    $addToSet: { likes: req.body.user._id },
  }, { new: true })
    .then((card) => {
      if (!card) throw new NotFoundError('Передан несуществующий _id карточки.');
      res.send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') return next(new BadRequestError('Переданы некорректные данные для постановки лайка.'));
      return next(err);
    });
};
export const dislikeCard = (req: Request, res: Response, next: NextFunction) => {
  Card.findByIdAndUpdate(req.params.cardId, {
    $pull: { likes: req.body.user._id },
  }, { new: true })
    .then((card) => {
      if (!card) throw new NotFoundError('Передан несуществующий _id карточки.');
      res.send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') return next(new BadRequestError('Переданы некорректные данные для постановки лайка.'));
      return next(err);
    });
};
