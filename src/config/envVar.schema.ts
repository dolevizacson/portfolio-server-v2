import * as Joi from 'joi';

export default Joi.object({
  MONGODB_URL: Joi.string().required(),
  ADMIN_USER_NAME: Joi.string(),
  ADMIN_PASSWORD: Joi.string(),
  JWT_SECRET: Joi.string().required(),
  JWT_EXP: Joi.number().required(),
  COOKIE_SECRET: Joi.string().required(),
  COOKIE_JWT_MAX_AGE: Joi.number().required(),
  CLOUDINARY_NAME: Joi.string().required(),
  CLOUDINARY_API_KEY: Joi.string().required(),
  CLOUDINARY_SECRET: Joi.string().required(),
  CONTACT_EMAIL: Joi.string().required(),
  OAUTH_CLIENT_ID: Joi.string().required(),
  OAUTH_CLIENT_SECRET: Joi.string().required(),
  OAUTH_REFRESH_TOKEN: Joi.string().required(),
});
