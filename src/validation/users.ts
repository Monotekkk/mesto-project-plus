import { Joi, celebrate } from 'celebrate';
const urlRegex = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{2,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&/=]*)$/i;
export const loginValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(5),
  }),
});

export const createUserValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(200),
    avatar: Joi.string().pattern(urlRegex),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(5),
  }),
});

export const getUserByIdValidator = celebrate({
  params: Joi.object().keys({
    id : Joi.string().required().hex().length(24),
  }),
});

export const updateProfileValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(200),
  }),
});

export const updateUserAvatarValidator = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().pattern(urlRegex),
  }),
});
