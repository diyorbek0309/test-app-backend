import Joi from 'joi';

interface TypeSchema {
  register: Joi.Schema;
  login: Joi.Schema;
}

const authSchema: TypeSchema = {
  register: Joi.object().keys({
    body: Joi.object().keys({
      username: Joi.string().required().min(3),
      email: Joi.string().required().email(),
      firstName: Joi.string().required().min(3),
      lastName: Joi.string().required().min(3),
      password: Joi.string().required().min(8),
    }),
  }),
  login: Joi.object().keys({
    body: Joi.object()
      .keys({
        username: Joi.string().optional(),
        email: Joi.string().optional(),
        password: Joi.string().required(),
      })
      .or('username', 'phone'),
  }),
};

export default authSchema;
