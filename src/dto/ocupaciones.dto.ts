import { IsString } from 'class-validator';

export class OcupacionesDto {
  @IsString()
  filtro: string;
}
