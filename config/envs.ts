import 'dotenv/config';

import * as dotenv from 'dotenv';
import * as joi from 'joi';
import * as path from 'path';

dotenv.config({
  path: path.resolve(__dirname, '../../../kubernetes/envs/global.env'),
});
dotenv.config({
  path: path.resolve(__dirname, '../../../kubernetes/envs/examenes.env'),
});

interface EnvVars {
  HSM_CORE_COMMON_NAME: string;
  HSM_CORE_COMMON_HOST: string;
  HSM_CORE_COMMON_PORT: number;

  DB_USER: string;
  DB_PASSWORD: string;
  DB_CONNECTION_STRING: string;
  LD_LIBRARY_PATH: string;
}

const envsSchema = joi
  .object({
    HSM_CORE_COMMON_NAME: joi.string().required(),
    HSM_CORE_COMMON_HOST: joi.string().default('localhost'),
    HSM_CORE_COMMON_PORT: joi.number().required(),

    DB_USER: joi.string().required(),
    DB_PASSWORD: joi.string().required(),
    DB_CONNECTION_STRING: joi.string().required(),
    LD_LIBRARY_PATH: joi.string().default('C:/ORACLE/instantclient_12_1'),
  })
  .unknown()
  .required();

const { error, value } = envsSchema.validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const envVars: EnvVars = value;

export const envs = {
  HSM_CORE_COMMON_NAME: envVars.HSM_CORE_COMMON_NAME,
  HSM_CORE_COMMON_HOST: envVars.HSM_CORE_COMMON_HOST,
  HSM_CORE_COMMON_PORT: envVars.HSM_CORE_COMMON_PORT,

  DB_USER: envVars.DB_USER,
  DB_PASSWORD: envVars.DB_PASSWORD,
  DB_CONNECTION_STRING: envVars.DB_CONNECTION_STRING,
  LD_LIBRARY_PATH: envVars.LD_LIBRARY_PATH,
};
