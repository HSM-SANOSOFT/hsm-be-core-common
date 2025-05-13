import { CgRefCodeService } from './cgRefCode.repository';
import { CrmChatMenuPrincipalRepository } from './crmChatMenuPrincipal.repository';
import { SgiPilaresService } from './sgiPilares.repository';
import { VwServiciosChatService } from './vwServiciosChat.repository';

export const DatabaseRepositories = [
  CgRefCodeService,
  SgiPilaresService,
  VwServiciosChatService,
  CrmChatMenuPrincipalRepository,
];

export * from './cgRefCode.repository';
export * from './crmChatMenuPrincipal.repository';
export * from './sgiPilares.repository';
export * from './vwServiciosChat.repository';
