import 'dotenv/config';

import * as joi from 'joi';

interface EnvVars {
  DB_USER: string;
  DB_PASSWORD: string;
  DB_CONNECTION_STRING: string;
  LD_LIBRARY_PATH: string;

  CHATWOOT_BASE_URL: string;
  CHATWOOT_API_KEY: string;
  CHATWOOT_ACCOUNT_ID: string;
}

const envsSchema = joi
  .object({
    DB_USER: joi.string().required(),
    DB_PASSWORD: joi.string().required(),
    DB_CONNECTION_STRING: joi.string().required(),
    LD_LIBRARY_PATH: joi.string().default('/usr/lib/oracle/12.1/client64/lib'),
    CHATWOOT_BASE_URL: joi.string().uri().required(),
    CHATWOOT_API_KEY: joi.string().required(),
    CHATWOOT_ACCOUNT_ID: joi.string().required(),
  })
  .unknown()
  .required();

const validationSchema = envsSchema.validate(process.env);

if (validationSchema.error) {
  throw new Error(`Config validation error: ${validationSchema.error.message}`);
}

const envVars: EnvVars = validationSchema.value as EnvVars;

export const envs = {
  DB_USER: envVars.DB_USER,
  DB_PASSWORD: envVars.DB_PASSWORD,
  DB_CONNECTION_STRING: envVars.DB_CONNECTION_STRING,
  LD_LIBRARY_PATH: envVars.LD_LIBRARY_PATH,

  CHATWOOT_BASE_URL: envVars.CHATWOOT_BASE_URL,
  CHATWOOT_API_KEY: envVars.CHATWOOT_API_KEY,
  CHATWOOT_ACCOUNT_ID: envVars.CHATWOOT_ACCOUNT_ID,
};
