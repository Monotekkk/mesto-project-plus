import express from 'express';
import mongoose from 'mongoose';
import userRouter from './router/user';
import cardRouter from './router/cards';
import { createUser, login } from './controllers/users';
import auth from './middlewares/auth';

const { PORT = 3000, BASE_PATH = 'none' } = process.env;
const app = express();
mongoose.connect('mongodb://localhost:27017/mestodb');
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use((req, res, next) => {
  req.body.user = {
    _id: '66704f463f850696f61b3031',
  };
  next();
});
app.post('/signin', login);
app.post('/signup', createUser);
app.use('/users', userRouter);
app.use('/cards', cardRouter);
app.use('*', (req, res) => { res.status(404).send('Страница не найдена'); });
app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
  console.log(BASE_PATH);
});
