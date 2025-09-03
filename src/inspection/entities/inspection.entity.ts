import { Location } from 'src/location/entities/location.entity';
import { StatusInspection } from '@prisma/client';
import { User } from 'src/user/entities/user.entity';

export class Inspection {
  Id: number;
  Status: StatusInspection;
  Location: Location;
  User: User;
}
