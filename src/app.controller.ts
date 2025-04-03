import { Controller, Logger } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

import { AppService } from './app.service';
@Controller()
export class AppController {
  private readonly logger = new Logger(AppController.name);
  constructor(private readonly appService: AppService) {}

  @MessagePattern('tipoAtencion')
  async tipoAtencion() {
    const response = await this.appService.tipoAtencion();
    this.logger.log('tipoAtencion(): ' + JSON.stringify(response));
    return response;
  }

  @MessagePattern('tipoServiciosChat')
  async tipoServiciosChat() {
    const response = await this.appService.tipoServiciosChat();
    this.logger.log('tipoServiciosChat(): ' + JSON.stringify(response));
    return response;
  }
}
