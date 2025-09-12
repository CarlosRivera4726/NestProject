import { Injectable } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UsuarioService {
  constructor(private prisma: PrismaService) {}
  async create(createUsuarioDto: CreateUsuarioDto) {
    return await this.prisma.usuario.create({
      data: {
        personaId: createUsuarioDto.personaId,
      },
    });
  }

  async findAll() {
    return await this.prisma.usuario.findMany({
      include: {
        persona: true,
      },
    });
  }

  async findOne(id: number) {
    return await this.prisma.usuario.findUnique({
      where: {
        id: id,
      },
      include: {
        persona: true,
      },
    });
  }

  async update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    return await this.prisma.usuario.update({
      where: {
        id: id,
      },
      data: {
        personaId: updateUsuarioDto.personaId,
      },
    });
  }

  async remove(id: number) {
    return await this.prisma.usuario.delete({
      where: {
        id: id,
      },
    });
  }
}
