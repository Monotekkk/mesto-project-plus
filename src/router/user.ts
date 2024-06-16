import { Router } from 'express';
import { getUsers } from '../controllers/users';

const userRouter = Router();
userRouter.get('/', getUsers);

export default userRouter;
