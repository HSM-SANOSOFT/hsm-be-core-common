import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import type { MicroserviceOptions } from '@nestjs/microservices';
import { Transport } from '@nestjs/microservices';

import { envs } from '../config';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger(envs.COMMON_MICROSERVICE_NAME);

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options: {
        host: envs.COMMON_MICROSERVICE_HOST,
        port: envs.COMMON_MICROSERVICE_PORT,
      },
    },
  );

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  await app.listen();
  logger.log(`Microservice is active on port ${envs.COMMON_MICROSERVICE_PORT}`);
}
bootstrap();
