import { Request, Response } from 'express';
import Card from '../models/card';

export const createCard = (req: Request, res: Response) => {
  const {
    name,
    link,
    user,
  } = req.body;
  Card.create({
    name,
    link,
    owner: user._id,
  })
    .then((card) => res.send(card));
};

export const getCards = (req: Request, res: Response) => {
  Card.find()
    .then((cards) => {
      res.send({ data: cards });
    });
};

export const deleteCards = (req: Request, res: Response) => {
  const { cardId } = req.params;
  Card.remove({ cardId }).then((result) => {
    res.send({ result });
  });
};
export const likeCard = (req: Request, res: Response) => {
  Card.findByIdAndUpdate(req.params._id, {
    $addToSet: { likes: req.body.user._id },
  }, { new: true }).then((result) => {
    res.send({ result });
  });
};
export const dislikeCard = (req: Request, res: Response) => {
  Card.findByIdAndUpdate(req.params._id, {
    $pull: { likes: req.body.user._id },
  }, { new: true }).then((result) => {
    res.send({ result });
  });
};
