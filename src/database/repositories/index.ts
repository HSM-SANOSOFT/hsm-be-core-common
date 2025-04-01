import { CgRefCodeService } from './cgRefCode.repository';
import { SgiPilaresService } from './sgiPilares.repository';
import { VwServiciosChatService } from './vwServiciosChat.repository';

export const DatabaseRepositories = [
  CgRefCodeService,
  SgiPilaresService,
  VwServiciosChatService,
];

export * from './cgRefCode.repository';
export * from './sgiPilares.repository';
export * from './vwServiciosChat.repository';
