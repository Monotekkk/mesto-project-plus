import { Router } from 'express';
import {
  getUsers, updateProfile, updateAvatar,
  getUserByID,
  getUser,
} from '../controllers/users';

const userRouter = Router();
userRouter.get('/', getUsers);
userRouter.get('/me', getUser);
userRouter.get('/:id', getUserByID);
userRouter.patch('/me', updateProfile);
userRouter.patch('/me/avatar', updateAvatar);
export default userRouter;
