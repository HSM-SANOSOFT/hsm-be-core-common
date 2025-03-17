import { Controller, Logger } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { AppService } from './app.service';
@Controller()
export class AppController {
  private readonly logger = new Logger(AppController.name);
  constructor(private readonly appService: AppService) {}

  @MessagePattern('tipoAtencion')
  async tipoAtencion() {
    return await this.appService.tipoAtencion();
  }
}
