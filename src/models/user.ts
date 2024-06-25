import {
  model, Model, Schema, Document,
} from 'mongoose';
import bcrypt from 'bcryptjs';
import { isEmail } from 'validator';
import { isValidUrl } from '../validation/urlRegex';
import UnAuthError from 'errors/un-auth-error';

interface User {
  name: string;
  about: string;
  avatar: string;
  email: string;
  password: string;
}
interface UserModel extends Model<User> {
  findUserByCredentials: (email: string, password: string) => Promise<Document<unknown, any, User>>
}
const userSchema = new Schema<User>({
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
    validate: {
      validator:(url:string) => isValidUrl(url),
      message: 'Ссылка не удовлетворяет условию'
    }
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
    select: false,
  },
});
userSchema.static('findUserByCredentials', function findUserByCredentials(email: string, password: string) {
  return this.findOne({ email }).select('+password').then((user:User) => {
    if (!user) {
      return Promise.reject(new UnAuthError('Неправильные почта или пароль'));
    }

    return bcrypt.compare(password, user.password).then((matched) => {
      if (!matched) {
        return Promise.reject(new UnAuthError('Неправильные почта или пароль'));
      }

      return user;
    });
  });
});
export default model<User, UserModel>('user', userSchema);
