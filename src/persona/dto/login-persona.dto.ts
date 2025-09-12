import { IsEmail, IsString } from 'class-validator';

export class LoginPersonaDto {
  @IsEmail()
  email: string;
  @IsString()
  password: string;

  role: string;
}
