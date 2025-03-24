import { Controller, Logger } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

import { AppService } from './app.service';
@Controller()
export class AppController {
  private readonly logger = new Logger(AppController.name);
  constructor(private readonly appService: AppService) {}

  @MessagePattern('tipoAtencion')
  async tipoAtencion() {
    const result = await this.appService.tipoAtencion();
    this.logger.log('tipoAtencion(): ', result);
    return result;
  }

  @MessagePattern('tipoServiciosChat')
  async tipoServiciosChat() {
    const result = await this.appService.tipoServiciosChat();
    this.logger.log('tipoServiciosChat(): ', result);
    return result;
  }
}
