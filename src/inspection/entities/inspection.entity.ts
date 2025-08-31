import { Location } from 'src/location/entities/location.entity';
import { InspectionStatus } from 'src/enum/Status';
import { User } from 'src/user/entities/user.entity';

export class Inspection {
  Id: number;
  Status: InspectionStatus;
  Location: Location;
  User: User;
}
