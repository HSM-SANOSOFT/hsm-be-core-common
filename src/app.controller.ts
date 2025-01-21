import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { AppService } from './app.service';
import { ParroquiasDto } from './dto/parroquias.dto';
import { PromocionesDto } from './dto/promociones.dto';
import { ValidaCedulaDto } from './dto/validacedula.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('initMS')
  InitMS() {
    return this.appService.InitMS();
  }

  @MessagePattern('combobox')
  combobox() {
    return this.appService.combobox();
  }

  @MessagePattern('promociones')
  promociones(@Payload() promocionesDto: PromocionesDto) {
    return this.appService.promociones(promocionesDto);
  }

  @MessagePattern('parroquias')
  parroquias(@Payload() parroquiasDto: ParroquiasDto) {
    return this.appService.parroquias(parroquiasDto);
  }

  @MessagePattern('validarCedula')
  validarCedula(@Payload() validacedulaDto: ValidaCedulaDto) {
    return this.appService.validarCedula(validacedulaDto);
  }
}
