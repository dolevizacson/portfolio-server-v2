import * as Joi from 'joi';

export default Joi.object({
  MONGODB_URL: Joi.string().required(),
});
