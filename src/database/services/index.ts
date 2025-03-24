import { CgRefCodeService } from './cgRefCode.service';
import { SgiPilaresService } from './sgiPilares.service';
import { VwServiciosChatService } from './vwServiciosChat.service';

export const DatabaseTableServices = [
  CgRefCodeService,
  SgiPilaresService,
  VwServiciosChatService,
];

export * from './cgRefCode.service';
export * from './sgiPilares.service';
export * from './vwServiciosChat.service';
