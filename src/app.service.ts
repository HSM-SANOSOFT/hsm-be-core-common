import { Injectable, Logger } from '@nestjs/common';

import { DatabaseService } from './database/database.service';
@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);

  constructor(private readonly databaseService: DatabaseService) {}
  async tipoAtencion() {
    const result = await this.databaseService.tipoAtencion();
    console.log(result);
    return result;
  }
}
