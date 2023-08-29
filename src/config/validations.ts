import * as Joi from 'joi';

export const envValidationSchema = Joi.object({
  NODE_ENV: Joi.string().valid('development', 'staging', 'production'),
  API_PORT: Joi.number().required(),
  POSTGRES_PORT: Joi.number().required(),
  POSTGRES_USER: Joi.string().required(),
  POSTGRES_PASSWORD: Joi.string().required(),
  POSTGRES_DB: Joi.string().required(),
  DATABASE_URL: Joi.string().required(),
  JWT_SECRET: Joi.string().required(),
  JWT_EXPIRES_IN: Joi.string().required(),
  ADMINJS_COMPANY_NAME: Joi.string().required(),
  ADMINJS_APP_VERSION: Joi.string().required(),
  ADMINJS_AUTH_COOKIE_NAME: Joi.string().required(),
  ADMINJS_AUTH_COOKIE_PASSWORD: Joi.string().required(),
  WEB_URL: Joi.string().required(),
});
