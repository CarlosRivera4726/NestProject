import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateInspectorDto {
  @ApiProperty({
    description: 'ID de la persona que será inspector',
    example: 1,
  })
  @IsNumber()
  personaId: number;

  @ApiProperty({
    description: 'ID de la ubicación a inspeccionar',
    example: 1,
  })
  @IsNumber()
  locationId: number;
}
