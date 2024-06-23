import { Joi, celebrate } from 'celebrate';

export const createCardValidator = celebrate({
  body: Joi.object().keys({
    user: Joi.object(),
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().uri(),
  }),
});

export const deleteCardByIdValidator = celebrate({
  params: Joi.object().keys({
    user: Joi.object(),
    cardId: Joi.string().required().hex().length(24),
  }),
});

export const likeCardValidator = celebrate({
  params: Joi.object().keys({
    user: Joi.object(),
    cardId: Joi.string().required().hex().length(24),
  }),
});

export const dislikeCardValidator = celebrate({
  params: Joi.object().keys({
    user: Joi.object(),
    cardId: Joi.string().required().hex().length(24),
  }),
});
