import { Injectable } from '@nestjs/common';

import {
  CgRefCodeService,
  SgiPilaresService,
  VwServiciosChatService,
} from './services';

@Injectable()
export class DatabaseRepositories {
  constructor(
    public cgRefCodeService: CgRefCodeService,
    public sgiPilaresSerivice: SgiPilaresService,
    public vwServiciosChatService: VwServiciosChatService,
  ) {}
}
