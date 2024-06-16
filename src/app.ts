import express from 'express';
import mongoose from 'mongoose';
import userRouter from 'router/user';

const { PORT = 5050, BASE_PATH = 'none' } = process.env;
const app = express();
mongoose.connect('mongodb://localhost:27017/mestodb');
app.use('/users', userRouter);
app.listen(PORT, () => {
  console.log('Ссылка на сервер');
  console.log(BASE_PATH);
});
