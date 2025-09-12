import { IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginPersonaDto {
  @ApiProperty({
    description: 'Correo electrónico para el login',
    example: 'usuario@email.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Contraseña del usuario',
    example: 'password123',
  })
  @IsString()
  password: string;

  @ApiProperty({
    description: 'Rol del usuario',
    example: 'INSPECTOR',
  })
  role: string;
}
