import { models } from '@hsm-sanosoft/hsm-database';
import { Injectable, Logger } from '@nestjs/common';
import * as oracledb from 'oracledb';

import { DatabaseService } from '../database.service';

@Injectable()
export class CrmChatMenuPrincipalRepository {
  private readonly logger = new Logger();
  constructor(private readonly databaseService: DatabaseService) {}

  async chatbootMenuPrincipal() {
    const result =
      await this.databaseService.execute<models.CrmChatMenuPrincipalModel>(
        `SELECT * FROM CRM_CHAT_MENU_PRINCIPAL WHERE ESTADO = 'D'`,
        [],
        { outFormat: oracledb.OUT_FORMAT_OBJECT },
      );
    const data = result.rows;
    return data;
  }
}
