import { Router } from 'express';
import {
  getUsers, updateProfile, updateAvatar,
  getUserByID,
} from '../controllers/users';
import {
  getUserByIdValidator,
  updateUserAvatarValidator,
  updateProfileValidator,
} from '../validation/users';

const userRouter = Router();
userRouter.get('/', getUsers);
userRouter.get('/me', getUserByID);
userRouter.get('/:id', getUserByIdValidator, getUserByID);
userRouter.patch('/me', updateProfileValidator, updateProfile);
userRouter.patch('/me/avatar', updateUserAvatarValidator, updateAvatar);
export default userRouter;
