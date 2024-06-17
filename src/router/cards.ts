import { Router } from 'express';
import { createCard, getCards, deleteCards } from '../controllers/cards';

const cardRouter = Router();
cardRouter.post('/', createCard);
cardRouter.get('/', getCards);
cardRouter.delete('/:cardId', deleteCards);
export default cardRouter;
