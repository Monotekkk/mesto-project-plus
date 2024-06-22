import { Router } from 'express';
import {
  getUsers, updateProfile, updateAvatar,
  getUserMe,
  getUserByID,
} from '../controllers/users';

const userRouter = Router();
userRouter.get('/', getUsers);
userRouter.get('/me', getUserMe);
userRouter.get('/:id', getUserByID);
userRouter.patch('/me', updateProfile);
userRouter.patch('/me/avatar', updateAvatar);
export default userRouter;
