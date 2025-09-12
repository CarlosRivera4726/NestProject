import { PersonaRol } from '@prisma/client';
import { IsEmail, IsString } from 'class-validator';

export class CreatePersonaDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;
  @IsString()
  password: string;

  role?: PersonaRol;
}
