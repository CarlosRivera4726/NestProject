import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAdministratorDto {
  @ApiProperty({
    description: 'ID de la persona que será administrador',
    example: 1,
    type: 'number',
  })
  @IsNumber()
  personaId!: number;
}
