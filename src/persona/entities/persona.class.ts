import { StatusLocation } from '@prisma/client';
import { CreateLocationDto } from 'src/location/dto/create-location.dto';
import { Location } from 'src/location/entities/location.entity';
import { PrismaService } from 'src/prisma.service';
abstract class PersonaClass {
  name: string;
  email: string;
  password: string;
  role: string;

  public abstract createLocation(): Promise<Location>;
}

export class AdminClass extends PersonaClass {
  location: Location;
  constructor(
    private prisma: PrismaService,
    location?: CreateLocationDto
  ) {
    super();
    if (location) {
      this.location = location;
    }
  }
  public async createLocation(): Promise<Location> {
    return await this.prisma.location.create({
      data: {
        name: this.location.name,
        coordinates: this.location.coordinates,
        status: this.location.status as StatusLocation,
      },
    });
  }
  public async obtenerUbicaciones(): Promise<Location[]> {
    return await this.prisma.location.findMany();
  }
}
