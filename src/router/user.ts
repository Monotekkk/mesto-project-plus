import { Router } from 'express';
import {
  getUsers, getUserByID, updateProfile, updateAvatar,
  getUser,
} from '../controllers/users';

const userRouter = Router();
userRouter.get('/', getUsers);
userRouter.get('/:id', getUserByID);
userRouter.patch('/me', updateProfile);
userRouter.get('/me', getUsers);
userRouter.patch('/me/avatar', updateAvatar);
export default userRouter;