import { Injectable } from '@nestjs/common';
import { CreateInspectorDto } from './dto/create-inspector.dto';
import { UpdateInspectorDto } from './dto/update-inspector.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class InspectorService {
  constructor(private prisma: PrismaService) {}

  async create(createInspectorDto: CreateInspectorDto) {
    try {
      const inspector = await this.prisma.inspector.create({
        data: {
          personaId: createInspectorDto.personaId,
        },
      });

      return inspector;
    } catch (error: unknown) {
      return error;
    }
  }

  async findAll() {
    return await this.prisma.inspector.findMany({
      include: {
        persona: true,
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
