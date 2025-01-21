import { Injectable, Logger } from '@nestjs/common';
import { envs } from 'config';

@Injectable()
export class AppService {
  private readonly logger = new Logger(envs.COMMON_MICROSERVICE_NAME);

  InitMS() {
    return 'Microservice is up and running !';
  }
}
