import { UserRol } from '@prisma/client';
import { IsEmail, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;
  @IsString()
  password: string;

  role?: UserRol;
}
