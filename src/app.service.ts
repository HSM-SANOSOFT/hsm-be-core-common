import { models } from '@hsm-sanosoft/hsm-database';
import { Injectable, Logger } from '@nestjs/common';

import { DatabaseRepository } from './database/database.repository';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);

  constructor(private readonly databaseRepository: DatabaseRepository) {}
  async tipoAtencion() {
    const result =
      await this.databaseRepository.sgiPilaresSerivice.tipoAtencion();
    const data = result?.map(item => {
      return { NOM_COR: item.NOM_COR, DESCRIPCION: item.DESCRIPCION };
    });
    return data;
  }

  async tipoServiciosChat() {
    const result =
      await this.databaseRepository.vwServiciosChatService.tipoServiciosChat();
    const data = result;
    return data;
  }

  async chatbotMenus(id: string) {
    switch (id) {
      case 'principal': {
        const principal =
          await this.databaseRepository.crmChatMenuPrincipalService.chatbootMenuPrincipal();
        const principalMenu = principal
          ?.sort((a, b) => a.ORDEN! - b.ORDEN!)
          .map(item => ({
            ORDEN: item.ORDEN,
            NOM_COR: item.NOM_COR,
            PALABRA: item.PALABRA,
          }));
        return principalMenu;
      }
      default:
        return [];
    }
  }
}
