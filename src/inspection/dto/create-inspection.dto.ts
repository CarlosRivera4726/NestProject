import { StatusInspection } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateInspectionDto {
  @ApiProperty({
    description: 'Estado de la inspección',
    enum: StatusInspection,
    example: StatusInspection.AVAILABLE,
  })
  @IsEnum(StatusInspection)
  @IsNotEmpty()
  status: StatusInspection;

  @ApiProperty({
    description: 'ID de la ubicación a inspeccionar',
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  locationId: number;

  @ApiProperty({
    description: 'ID del usuario que solicita la inspección',
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @ApiProperty({
    description: 'ID del inspector asignado',
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  inspectorId: number;
}
