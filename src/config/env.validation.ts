import * as Joi from 'joi';

export const envValidationSchema = Joi.object({
  JWT_SECRET: Joi.string().required(),
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test')
    .default('development'),
});
