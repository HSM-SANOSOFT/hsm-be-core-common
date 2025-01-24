import { Inject, Injectable } from '@nestjs/common';
import { Connection } from 'oracledb';
import * as oracledb from 'oracledb';

@Injectable()
export class DatabaseService {
  constructor(
    @Inject('ORACLE_CONNECTION') private readonly connection: Connection,
  ) {}

  async getcombobox() {
    const result = await this.connection.execute(
      `select RV_DOMAIN,RV_LOW_VALUE,RV_MEANING,RV_TYPE  from CG_REF_CODES 
        where RV_DOMAIN in('SEXO','ESTADO_CIVIL','GRUPO SANGUINEO','SERVICIO PERMANENCIA','SERVICIO','TIPO_SEGURO_IESS','PARENTESCO_IESS',
        'CONT_CUBIERTA_IESS','DERIVACION_IESS','TIPO_ESPECIALIDAD_IESS','DEPENDENCIAS_IESS','INSTRUCCION','TIPO ASEGURADO','TIPO_CEDULA','NACIONALIDADES','GRUPOS_CULTURALES','TIPO_BENEFICIARIO_IESS','ENTIDAD_DEL_SISTEMA','TIPOLOGIA','SERVICIO REFERENCIA','MOTIVO_REFERENCIA','TIPO DIAGNOSTICO','CODIGO_SEGURO_IESS','TIPO_RED') AND RV_MEANING IS NOT NULL
        order by RV_DOMAIN,RV_MEANING`,
      [],
      { outFormat: oracledb.OUT_FORMAT_OBJECT },
    );
    return result.rows.length > 0 ? result.rows : null;
  }

  async getpromociones(filtro: string) {
    const result = await this.connection.execute(
      `select CODIGO,DESCRIPCION from PROMOCIONES where ` + filtro,
      [],
      { outFormat: oracledb.OUT_FORMAT_OBJECT },
    );
    return result.rows.length > 0 ? result.rows : null;
  }


  async getocupaciones(filtro: string) {
    const result = await this.connection.execute(
      `select CODIGO,OCUPACION from OCUPACIONES where ` + filtro,
      [],
      { outFormat: oracledb.OUT_FORMAT_OBJECT },
    );
    return result.rows.length > 0 ? result.rows : null;
  }
  

  async getparroquias(filtro: string) {
    const result = await this.connection.execute(
      `select DISTINCT PA.CODIGO,PA.PARROQUIA,PA.CNT_PRV_CODIGO,PRO.PROVINCIA,PA.CNT_CODIGO,CAN.CANTON
      from PARROQUIAS PA
      INNER JOIN PROVINCIAS PRO ON PRO.CODIGO = PA.CNT_PRV_CODIGO
      INNER JOIN CANTONES CAN ON CAN.CODIGO = PA.CNT_CODIGO AND CAN.PRV_CODIGO = PRO.CODIGO where ` +
        filtro,
      [],
      { outFormat: oracledb.OUT_FORMAT_OBJECT },
    );
    return result.rows.length > 0 ? result.rows : null;
  }
}
