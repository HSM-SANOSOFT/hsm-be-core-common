import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { envs } from 'config';

import { DatabaseService } from './database/database.service';
import { ParroquiasDto } from './dto/parroquias.dto';
import { PromocionesDto } from './dto/promociones.dto';
import { ValidaCedulaDto } from './dto/validacedula.dto';

@Injectable()
export class AppService {
  private readonly logger = new Logger(envs.COMMON_MICROSERVICE_NAME);

  constructor(private readonly databaseService: DatabaseService) {}

  InitMS() {
    return 'Microservice is up and running!';
  }

  async combobox() {
    let datos: any;
    try {
      datos = await this.databaseService.getcombobox();
    } catch (error) {
      throw new RpcException({
        status: HttpStatus.BAD_REQUEST,
        message: error,
        keys: '',
      });
    }
    return datos;
  }

  async promociones(promocionesDto: PromocionesDto) {
    const { filtro } = promocionesDto;
    let datos: any;
    let where = '';
    if (filtro.length > 0) {
      where = `ESTADO_DE_DISPONIBILIDAD ='D' AND DESCRIPCION like '%${filtro}%' or CODIGO like '%${filtro}%'`;
    } else {
      where = `ESTADO_DE_DISPONIBILIDAD ='D'`;
    }
    try {
      datos = await this.databaseService.getpromociones(where);
    } catch (error) {
      throw new RpcException({
        status: HttpStatus.BAD_REQUEST,
        message: error,
        keys: '',
      });
    }
    return datos;
  }

  async parroquias(parroquiasDto: ParroquiasDto) {
    const { filtro } = parroquiasDto;
    let datos: any;
    let where = '';
    if (filtro.length > 0) {
      where = `PA.PARROQUIA like '%${filtro.toUpperCase()}%' AND ROWNUM < 50`;
    } else {
      where = `ROWNUM < 50`;
    }

    try {
      datos = await this.databaseService.getparroquias(where);
    } catch (error) {
      throw new RpcException({
        status: HttpStatus.BAD_REQUEST,
        message: error,
        keys: '',
      });
    }
    return datos;
  }

  async validarCedula(validacedulaDto: ValidaCedulaDto) {
    const { ci } = validacedulaDto;
  

    if (!/^\d{10}$/.test(ci)) {
      return{
        status: 404,
        message: 'La cédula ingresada debe tener 10 dígitos.',
      };
    }
  

    const provincia = parseInt(ci.substring(0, 2), 10);
    if ((provincia < 1 || provincia > 24) && provincia !== 30) {
      return{
        status: 404,
        message:
          'Por favor, verifique el número de cédula ingresado, ya que no corresponde a ninguna provincia válida ni al código asignado para el extranjero.',
      };
    }
  
    const digitos = ci.split('').map(Number);
    const digitoVerificador = digitos[9];
    const coeficientes = [2, 1, 2, 1, 2, 1, 2, 1, 2];
  

    let suma = 0;
    for (let i = 0; i < coeficientes.length; i++) {
      let producto = digitos[i] * coeficientes[i];
      if (producto >= 10) {
        producto -= 9; 
      }
      suma += producto;
    }

    const residuo = suma % 10;
    const digitoCalculado = residuo === 0 ? 0 : 10 - residuo;
  

    if (digitoCalculado === digitoVerificador) {
      return {
        success: 200,
        message: 'Número de cédula correcto.',
      };
    } else {
      return{
        status: 400,
        message: 'El número de cédula ingresado es incorrecto.',
      };
    }
  }
  
}
