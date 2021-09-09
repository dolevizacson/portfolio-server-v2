import * as Joi from 'joi';

export default Joi.object({
  MONGODB_URL: Joi.string().required(),
  ADMIN_USER_NAME: Joi.string(),
  ADMIN_PASSWORD: Joi.string(),
  JWT_SECRET: Joi.string().required(),
  JWT_EXP: Joi.number().required(),
});
