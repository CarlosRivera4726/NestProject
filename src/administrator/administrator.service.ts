import { Injectable } from '@nestjs/common';
import { CreateAdministratorDto } from './dto/create-administrator.dto';
import { UpdateAdministratorDto } from './dto/update-administrator.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class AdministratorService {
  constructor(private prisma: PrismaService) {}

  async create(createAdministratorDto: CreateAdministratorDto) {
    try {
      const administrator = await this.prisma.administrador.create({
        include: {
          persona: true,
        },
        data: {
          personaId: createAdministratorDto.personaId,
        },
      });
      if (!administrator) {
        throw new Error('Failed to create administrator');
      }
      return administrator;
    } catch (error: unknown) {
      return error;
    }
  }

  async findAll() {
    try {
      const administrators = await this.prisma.administrador.findMany({});
      if (!administrators) {
        throw new Error('Failed to find administrators');
      }
      return administrators;
    } catch (error: unknown) {
      return error;
    }
  }

  async findOne(id: number) {
    return `This action returns a #${id} administrator`;
  }

  async update(id: number, updateAdministratorDto: UpdateAdministratorDto) {
    try {
      const administrator = await this.prisma.administrador.update({
        where: {
          id: id,
        },
        data: {
          personaId: updateAdministratorDto.personaId,
        },
      });
      if (!administrator) {
        throw new Error('Failed to update administrator');
      }
      return administrator;
    } catch (error: unknown) {
      return error;
    }
  }

  async remove(id: number) {
    try {
      const administrator = await this.prisma.administrador.delete({
        where: {
          id: id,
        },
      });
      if (!administrator) {
        throw new Error('Failed to delete administrator');
      }
      return administrator;
    } catch (error: unknown) {
      return error;
    }
  }
}
