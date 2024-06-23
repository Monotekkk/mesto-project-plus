import { Joi, celebrate } from 'celebrate';

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
    avatar: Joi.string().uri(),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(5),
  }),
});

export const getUserByIdValidator = celebrate({
  params: Joi.object().keys({
    user: Joi.object(),
    userId: Joi.string().required().hex().length(24),
  }),
});

export const updateProfileValidator = celebrate({
  body: Joi.object().keys({
    user: Joi.object(),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(200),
  }),
});

export const updateUserAvatarValidator = celebrate({
  body: Joi.object().keys({
    user: Joi.object(),
    avatar: Joi.string().uri(),
  }),
});
