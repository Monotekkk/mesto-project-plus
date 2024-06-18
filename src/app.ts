import express from 'express';
import mongoose from 'mongoose';
import * as process from 'node:process';
import userRouter from './router/user';
import cardRouter from './router/cards';

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
app.use('/users', userRouter);
app.use('/cards', cardRouter);
app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
  console.log(BASE_PATH);
});