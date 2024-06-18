import { Router } from 'express';
import {
  createCard, getCards, deleteCards, likeCard, dislikeCard,
} from '../controllers/cards';

const cardRouter = Router();
cardRouter.post('/', createCard);
cardRouter.get('/', getCards);
cardRouter.delete('/:cardId', deleteCards);
cardRouter.put('/:cardId/likes', likeCard);
cardRouter.delete('/:cardId/likes', dislikeCard);

export default cardRouter;
