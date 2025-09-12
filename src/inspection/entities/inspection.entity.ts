import { Location } from 'src/location/entities/location.entity';
import { StatusInspection } from '@prisma/client';
import { Persona } from 'src/persona/entities/persona.entity';

export class Inspection {
  Id: number;
  Status: StatusInspection;
  Location: Location;
  Persona: Persona;
}
