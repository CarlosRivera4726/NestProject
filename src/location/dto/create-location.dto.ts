import { IsString } from 'class-validator';
import { LocationStatus } from 'src/enum/Status';

export class CreateLocationDto {
  @IsString()
  name: string;

  @IsString()
  coordinates: string;

  status: LocationStatus;
}
