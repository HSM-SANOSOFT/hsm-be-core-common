import { Injectable } from '@nestjs/common';

import { CgRefCodeService, SgiPilaresService } from './services';
import { VwServiciosChatService } from './services/vwServiciosChat.service';

@Injectable()
export class DatabaseRepositories {
  constructor(
    public cgRefCodeService: CgRefCodeService,
    public sgiPilaresSerivice: SgiPilaresService,
    public vwServiciosChatService: VwServiciosChatService,
  ) {}
}
