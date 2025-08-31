import { IsEnum, IsNotEmpty, IsNumber } from 'class-validator';
import { InspectionStatus } from 'src/enum/Status';

export class CreateInspectionDto {
  @IsEnum(InspectionStatus)
  @IsNotEmpty()
  status: InspectionStatus;
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
