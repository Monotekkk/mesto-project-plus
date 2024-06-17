import express from 'express';
import mongoose from 'mongoose';
import userRouter from './router/user';
import * as process from "node:process";

const { PORT = 3000, BASE_PATH = 'none' } = process.env;
const app = express();
mongoose.connect('mongodb://localhost:27017/mestodb');
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use('/users', userRouter);
app.use('/users/:id', userRouter);
app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
