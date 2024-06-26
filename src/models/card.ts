import mongoose from 'mongoose';
import { isValidUrl } from '../validation/urlRegex';

interface Card {
  name: string;
  link: string;
  owner: mongoose.Schema.Types.ObjectId;
  likes: mongoose.Schema.Types.ObjectId[];
  created_at: Date;
}

const cardSchema = new mongoose.Schema<Card>({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator:(url:string) => isValidUrl(url),
      message: 'Ссылка не удовлетворяет условию'
    }
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'user',
  },
  likes: [{
    type: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user'
    }],
    default: [],
  }],
  created_at: {
    type: Date,
    default: Date.now,
  },
});
export default mongoose.model<Card>('card', cardSchema);
