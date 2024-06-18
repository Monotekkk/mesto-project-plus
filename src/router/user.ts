import { Router } from 'express';
import {
  getUsers, getUserByID, createUser, updateProfile, updateAvatar,
} from '../controllers/users';

const userRouter = Router();
userRouter.get('/', getUsers);
userRouter.get('/:id', getUserByID);
userRouter.post('/', createUser);
userRouter.patch('/me', updateProfile);
userRouter.patch('/me/avatar', updateAvatar);
export default userRouter;
