import { Injectable } from '@nestjs/common';
import { CreateInspectorDto } from './dto/create-inspector.dto';
import { UpdateInspectorDto } from './dto/update-inspector.dto';
import { PrismaService } from '../prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class InspectorService {
  constructor(private prisma: PrismaService) {}

  async create(createInspectorDto: CreateInspectorDto) {
    try {
      const { personaId, name, lastName, email, password, locationId } =
        createInspectorDto;

      const normalizedLocationId =
        typeof locationId === 'number' && locationId > 0 ? locationId : null;
      if (personaId && personaId > 0) {
        return await this.prisma.inspector.create({
          data: { personaId, locationId: normalizedLocationId },
          include: { persona: true },
        });
      }
      const hash = await bcrypt.hash(password, 10);

      return await this.prisma.$transaction(async (tx) => {
        const persona = await tx.persona.create({
          data: {
            name: `${name ?? ''} ${lastName ?? ''}`.trim(),
            email,
            password: hash,
            role: 'INSPECTOR',
          },
        });
        let inspector = await tx.inspector.findUnique({
          where: { personaId: persona.id },
          include: { persona: true, Location: true },
        });

        if (!inspector) {
          inspector = await tx.inspector.create({
            data: { personaId: persona.id, locationId: normalizedLocationId },
            include: { persona: true, Location: true },
          });
        } else {
          inspector = await tx.inspector.update({
            where: { personaId: inspector.personaId },
            data: { locationId: normalizedLocationId },
            include: { persona: true, Location: true },
          });
        }

        return inspector;
      });
    } catch (e: any) {
      if (e.code === 'P2002' && e.meta.target[0] === 'email') {
        throw new Error('El correo ya esta asignado a un inspector.');
      } else if (e.code === 'P2002') {
        throw new Error('El id de la persona ya tiene un inspector asignado.');
      }
      throw e;
    }
  }

  async findAll() {
    return await this.prisma.inspector.findMany({
      include: {
        persona: true,
        Location: true,
      },
    });
  }

  async findOne(id: number) {
    return await this.prisma.inspector.findUnique({
      where: {
        id: id,
      },
      include: {
        persona: true,
        Location: true,
      },
    });
  }

  async update(id: number, updateInspectorDto: UpdateInspectorDto) {
    try {
      const inspector = await this.prisma.inspector.update({
        where: {
          id: id,
        },
        data: {
          personaId: updateInspectorDto.personaId,
        },
      });

      return inspector;
    } catch (error: unknown) {
      return error;
    }
  }

  async remove(id: number) {
    try {
      const inspector = await this.prisma.inspector.delete({
        where: {
          id: id,
        },
      });

      return inspector;
    } catch (error: unknown) {
      return error;
    }
  }
}
