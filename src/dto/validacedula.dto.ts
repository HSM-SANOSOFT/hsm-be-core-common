import { IsNotEmpty, IsNumberString } from 'class-validator';

export class ValidaCedulaDto {
  @IsNumberString()
  @IsNotEmpty()
  ci: string;
}
