import { PersonaRol } from '@prisma/client';
import { IsEmail, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreatePersonaDto {
  @ApiProperty({
    description: 'Nombre de la persona',
    example: 'Juan Pérez',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Correo electrónico de la persona',
    example: 'juan.perez@email.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Contraseña de la persona',
    example: 'password123',
  })
  @IsString()
  password: string;

  @ApiPropertyOptional({
    description: 'Rol de la persona',
    enum: PersonaRol,
    example: PersonaRol.INSPECTOR,
  })
  role?: PersonaRol;
}
