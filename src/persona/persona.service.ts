import { Injectable } from '@nestjs/common';
import { CreatePersonaDto } from './dto/create-persona.dto';
import { UpdatePersonaDto } from './dto/update-persona.dto';
import { PrismaService } from '../prisma.service';
import * as bcrypt from 'bcrypt';
import { PersonaRol } from '@prisma/client';

const saltOrRounds = 10;

@Injectable()
export class PersonaService {
  constructor(private prisma: PrismaService) {}

  async create(createPersonaDto: CreatePersonaDto) {
    try {
      const hash = await bcrypt.hash(createPersonaDto.password, saltOrRounds);
      const persona = await this.prisma.persona.create({
        select: {
          id: true,
          name: true,
          email: true,
        },
        data: {
          name: createPersonaDto.name,
          email: createPersonaDto.email,
          password: hash,
          role:
            (createPersonaDto.role?.toUpperCase() as PersonaRol) || undefined,
        },
      });

      if (!persona) {
        throw new Error('Failed to create persona');
      }
      return persona;
    } catch (error: unknown) {
      return error;
    }
  }

  async findAll() {
    return await this.prisma.persona.findMany({});
  }

  async findOne(id: number) {
    try {
      const persona = await this.prisma.persona.findUnique({
        where: {
          id: id,
        },
      });
      return JSON.stringify(persona);
    } catch (error) {
      return JSON.stringify(error);
    }
  }

  async update(id: number, updatePersonaDto: UpdatePersonaDto) {
    try {
      const persona = await this.prisma.persona.update({
        where: {
          id: id,
        },
        data: {
          name: updatePersonaDto.name,
          email: updatePersonaDto.email,
          password: updatePersonaDto.password,
        },
      });
      return JSON.stringify(persona);
    } catch (error) {
      return JSON.stringify(error);
    }
  }

  async remove(id: number) {
    try {
      const persona = await this.prisma.persona.delete({
        where: {
          id: id,
        },
      });
      return JSON.stringify(persona);
    } catch (error) {
      return JSON.stringify(error);
    }
  }

  async validateUser(email: string, password: string) {
    try {
      const persona = await this.prisma.persona.findUnique({
        select: {
          email: true,
          role: true,
          password: true,
        },
        where: {
          email: email,
        },
      });
      if (persona && (await bcrypt.compare(password, persona.password))) {
        return persona;
      }
      return null;
    } catch (error) {
      return JSON.stringify(error);
    }
  }
}
