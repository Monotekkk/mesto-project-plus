import { Router } from 'express';
// eslint-disable-next-line import/named
import {getUsers, getUserByID, createUser} from '../controllers/users';

const userRouter = Router();
userRouter.get('/', getUsers);
userRouter.get('/:id', getUserByID);
userRouter.post('/', createUser);
export default userRouter;
