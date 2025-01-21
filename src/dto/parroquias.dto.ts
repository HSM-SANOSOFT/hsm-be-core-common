import { IsString } from 'class-validator';

export class ParroquiasDto {
  @IsString()
  filtro: string;
}
