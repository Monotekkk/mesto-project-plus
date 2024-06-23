import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import userRouter from './router/user';
import cardRouter from './router/cards';
import { createUser, login } from './controllers/users';
import { requestLogger, errorLogger } from './middlewares/logger'
import auth from './middlewares/auth';
import { errors } from 'celebrate';

const { PORT = 3000, BASE_PATH = 'none' } = process.env;
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
mongoose.connect('mongodb://localhost:27017/mestodb');
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(requestLogger);
app.post('/signin', login);
app.post('/signup', createUser);
app.use('/users', auth, userRouter);
app.use('/cards', auth, cardRouter);
app.use(errorLogger);

app.use(errors());

app.use('*', (req, res) => { res.status(404).send('Страница не найдена'); });
app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
  console.log(BASE_PATH);
});
