import { Request, Response } from 'express';
import Card from '../models/card';

export const createCard = (req: Request, res: Response) => {
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
      if (err.name === 'CastError') {
        res.status(400).send('Переданы некорректные данные при создании карточки');
      } else {
        res.status(500).send('Ошибка по умолчанию');
      }
    });
};

export const getCards = (req: Request, res: Response) => {
  Card.find()
    .then((cards) => {
      res.send(cards);
    })
    .catch(() => {
      res.status(500).send('Ошибка по умолчанию');
    });
};

export const deleteCards = (req: Request, res: Response) => {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        res.status(404).send('Карточка с указанным _id не найдена');
      } else if (card.owner.toString() !== res.locals.user._id) {
        res.status(401).send('Можно удалять только собственные карточки')
      } else {
        card.remove()
          .then(() => res.send(card));
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.send('Переданы некорректные данные.');
      } else {
        res.status(500).send('Ошибка по умолчанию');
      }
    });
};
export const likeCard = (req: Request, res: Response) => {
  Card.findByIdAndUpdate(req.params.cardId, {
    $addToSet: { likes: req.body.user._id },
  }, { new: true })
    .then((card) => {
      if (!card) {
        res.status(404).send('Передан несуществующий _id карточки.');
      } else {
        res.send(card);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send('Переданы некорректные данные для постановки лайка.');
      } else {
        res.status(500).send('Ошибка по умолчанию');
      }
    });
};
export const dislikeCard = (req: Request, res: Response) => {
  Card.findByIdAndUpdate(req.params.cardId, {
    $pull: { likes: req.body.user._id },
  }, { new: true })
    .then((card) => {
      if (!card) {
        res.status(404).send('Передан несуществующий _id карточки.');
      } else {
        res.send(card);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send('Переданы некорректные данные для снятия лайка.');
      } else {
        res.status(500).send('Ошибка по умолчанию');
      }
    });
};
