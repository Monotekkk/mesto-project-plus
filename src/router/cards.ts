import { Router } from 'express';
import {
  createCard, getCards, deleteCards, likeCard, dislikeCard,
} from '../controllers/cards';
import {
  createCardValidator,
  deleteCardByIdValidator,
  likeCardValidator,
  dislikeCardValidator,
} from '../validation/cards';

const cardRouter = Router();
cardRouter.post('/', createCardValidator, createCard);
cardRouter.get('/', getCards);
cardRouter.delete('/:cardId', deleteCardByIdValidator, deleteCards);
cardRouter.put('/:cardId/likes', likeCardValidator, likeCard);
cardRouter.delete('/:cardId/likes', dislikeCardValidator, dislikeCard);

export default cardRouter;
