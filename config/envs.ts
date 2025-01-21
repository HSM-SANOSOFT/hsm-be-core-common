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
  COMMON_MICROSERVICE_NAME: string;
  COMMON_MICROSERVICE_HOST: string;
  COMMON_MICROSERVICE_PORT: number;

  DB_USER: string;
  DB_PASSWORD: string;
  DB_CONNECTION_STRING: string;
  ORACLE_CLIENT_PATH: string;
}

const envsSchema = joi
  .object({
    COMMON_MICROSERVICE_NAME: joi.string().required(),
    COMMON_MICROSERVICE_HOST: joi.string().default('localhost'),
    COMMON_MICROSERVICE_PORT: joi.number().required(),

    DB_USER: joi.string().required(),
    DB_PASSWORD: joi.string().required(),
    DB_CONNECTION_STRING: joi.string().required(),
    ORACLE_CLIENT_PATH: joi.string().default('C:/ORACLE/instantclient_12_1'),
  })
  .unknown()
  .required();

const { error, value } = envsSchema.validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const envVars: EnvVars = value;

export const envs = {
  COMMON_MICROSERVICE_NAME: envVars.COMMON_MICROSERVICE_NAME,
  COMMON_MICROSERVICE_HOST: envVars.COMMON_MICROSERVICE_HOST,
  COMMON_MICROSERVICE_PORT: envVars.COMMON_MICROSERVICE_PORT,

  DB_USER: envVars.DB_USER,
  DB_PASSWORD: envVars.DB_PASSWORD,
  DB_CONNECTION_STRING: envVars.DB_CONNECTION_STRING,
  ORACLE_CLIENT_PATH: envVars.ORACLE_CLIENT_PATH,
};
