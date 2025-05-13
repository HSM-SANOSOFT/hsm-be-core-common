import { models } from '@hsm-sanosoft/hsm-database';
import { Injectable, Logger } from '@nestjs/common';
import * as oracledb from 'oracledb';

import { DatabaseService } from '../database.service';

@Injectable()
export class SgiPilaresService {
  private readonly logger = new Logger();
  constructor(private readonly databaseService: DatabaseService) {}

  async tipoAtencion() {
    const result = await this.databaseService.execute<models.SgiPilaresModel>(
      `SELECT * FROM SGI_PILARES`,
      [],
      { outFormat: oracledb.OUT_FORMAT_OBJECT },
    );
    const data = result.rows;
    return data;
  }
}
