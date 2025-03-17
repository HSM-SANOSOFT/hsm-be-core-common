import { HttpStatus, Inject, Injectable, Logger } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import * as oracledb from 'oracledb';

@Injectable()
export class DatabaseService {
  private readonly logger = new Logger(DatabaseService.name);
  constructor(
    @Inject('DATABASE_CONNECTION') private readonly dbPool: oracledb.Pool,
  ) {}

  async tipoAtencion() {
    let connection: oracledb.Connection | null = null;
    try {
      connection = await this.dbPool.getConnection();

      const result = await connection.execute(
        `SELECT CG.RV_LOW_VALUE, CG.RV_MEANING FROM CG_REF_CODES CG WHERE CG.RV_DOMAIN LIKE 'TIPO_ATENCION'`,
        [],
        { outFormat: oracledb.OUT_FORMAT_OBJECT },
      );

      return result.rows;
    } catch (error) {
      if (error instanceof RpcException) {
        throw error;
      }
      this.logger.error(`Error fetching data: ${error}`);
      throw new RpcException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: `Error fetching data: ${error}`,
      });
    } finally {
      if (connection) {
        try {
          await connection.close();
        } catch (error) {
          this.logger.error(error);
        }
      }
    }
  }
}
