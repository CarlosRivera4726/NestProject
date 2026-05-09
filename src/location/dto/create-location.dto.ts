import { IsString } from 'class-validator';
import { StatusLocation, PersonaRol } from '@prisma/client';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateLocationDto {
  @ApiProperty({
    description: 'Nombre de la ubicación',
    example: 'Oficina Central',
  })
  @IsString()
  name!: string;

  @ApiProperty({
    description: 'Coordenadas de la ubicación',
    example: '40.7128,-74.0060',
  })
  @IsString()
  coordinates!: string;

  @ApiProperty({
    description: 'Estado de la ubicación',
    enum: StatusLocation,
    example: StatusLocation.AVAILABLE,
  })
  status!: StatusLocation;

  @ApiPropertyOptional({
    description: 'Rol asociado a la ubicación',
    enum: PersonaRol,
    example: PersonaRol.INSPECTOR,
  })
  role?: PersonaRol;
}
