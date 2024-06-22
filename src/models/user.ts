import mongoose from 'mongoose';
import { isEmail } from 'validator';

interface User {
  name: string;
  about: string;
  avatar: string;
  email: string;
  password: string;
}

const userSchema = new mongoose.Schema<User>({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 200,
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (mail: string) => isEmail(mail),
      message: 'Некорректный email',
    },
  },
  password: {
    type: String,
    required: true,
  },
});
export default mongoose.model<User>('user', userSchema);
