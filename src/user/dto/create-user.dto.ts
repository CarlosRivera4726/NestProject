import { IsEmail, IsString } from 'class-validator';
import { RoleUser } from 'src/enum/RoleUser';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;
  @IsString()
  password: string;

  role: RoleUser;
}
