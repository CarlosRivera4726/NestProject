import { Injectable } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { PrismaService } from '../prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsuarioService {
  constructor(private prisma: PrismaService) {}
  async create(createUsuarioDto: CreateUsuarioDto) {
    try {
      const { personaId, name, lastName, email, password } = createUsuarioDto;

      if (personaId && personaId > 0) {
        return await this.prisma.usuario.create({
          data: { personaId },
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
            role: 'USUARIO',
          },
        });
        let usuario = await tx.usuario.findUnique({
          where: { personaId: persona.id },
          include: { persona: true },
        });

        if (!usuario) {
          usuario = await tx.usuario.create({
            data: { personaId: persona.id },
            include: { persona: true },
          });
        }

        return usuario;
      });
    } catch (e: any) {
      if (e.code === 'P2002' && e.meta.target[0] === 'email') {
        throw new Error('El correo ya esta asignado a un usuario.');
      } else if (e.code === 'P2002') {
        throw new Error('El id de la persona ya tiene un usuario asignado.');
      }
      throw e;
    }
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
