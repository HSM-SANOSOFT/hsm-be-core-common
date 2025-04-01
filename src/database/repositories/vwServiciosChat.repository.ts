import { Injectable, Logger } from '@nestjs/common';
import * as oracledb from 'oracledb';

import { DatabaseService } from '../database.service';
import { VwServiciosChatModel } from '../models/vwServiciosChat.model';

@Injectable()
export class VwServiciosChatService {
  private readonly logger = new Logger();
  constructor(private readonly databaseService: DatabaseService) {}

  async tipoServiciosChat() {
    const result = await this.databaseService.execute<VwServiciosChatModel>(
      `SELECT * FROM VW_SERVICIOS_CHAT`,
      [],
      { outFormat: oracledb.OUT_FORMAT_OBJECT },
    );
    const data = result.rows;
    return data;
  }
}
