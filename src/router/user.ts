import { Router } from 'express';
import {
  getUsers, updateProfile, updateAvatar,
  getUserByID,
} from '../controllers/users';

const userRouter = Router();
userRouter.get('/', getUsers);
userRouter.get('/me', getUserByID);
userRouter.get('/:id', getUserByID);
userRouter.patch('/me', updateProfile);
userRouter.patch('/me/avatar', updateAvatar);
export default userRouter;
