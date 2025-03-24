import { Injectable, Logger } from '@nestjs/common';

import { DatabaseRepositories } from './database/database.repository';
@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);

  constructor(private readonly databaseRepositories: DatabaseRepositories) {}
  async tipoAtencion() {
    const result =
      await this.databaseRepositories.sgiPilaresSerivice.tipoAtencion();
    const data = result?.map(item => {
      return { NOM_COR: item.NOM_COR, DESCRIPCION: item.DESCRIPCION };
    });
    return data;
  }

  async tipoServiciosChat() {
    const result =
      await this.databaseRepositories.vwServiciosChatService.tipoServiciosChat();
    const data = result;
    return data;
  }
}
