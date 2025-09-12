import { IsString } from 'class-validator';
import { StatusLocation, PersonaRol } from '@prisma/client';

export class CreateLocationDto {
  @IsString()
  name: string;

  @IsString()
  coordinates: string;

  status: StatusLocation;

  role?: PersonaRol;
}
