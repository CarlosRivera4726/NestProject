import { StatusInspection } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateInspectionDto {
  @IsEnum(StatusInspection)
  @IsNotEmpty()
  status: StatusInspection;
  @IsNumber()
  @IsNotEmpty()
  locationId: number;
  @IsNumber()
  @IsNotEmpty()
  userId: number;
  @IsNumber()
  @IsNotEmpty()
  inspectorId: number;
}
