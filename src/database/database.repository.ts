import { Injectable } from '@nestjs/common';

import {
  CgRefCodeService,
  SgiPilaresService,
  VwServiciosChatService,
} from './repositories';

@Injectable()
export class DatabaseRepository {
  constructor(
    public cgRefCodeService: CgRefCodeService,
    public sgiPilaresSerivice: SgiPilaresService,
    public vwServiciosChatService: VwServiciosChatService,
  ) {}
}
