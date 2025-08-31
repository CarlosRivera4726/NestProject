import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma.service';
import * as bcrypt from 'bcrypt';

const saltOrRounds = 10;

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  async create(createUserDto: CreateUserDto) {
    try {
      const hash = await bcrypt.hash(createUserDto.password, saltOrRounds);
      const user = await this.prisma.user.create({
        select: {
          id: true,
          name: true,
          email: true,
        },
        data: {
          name: createUserDto.name,
          email: createUserDto.email,
          password: hash,
        },
      });

      return JSON.stringify(user);
    } catch (error) {
      return JSON.stringify(error);
    }
  }

  async findAll() {
    return await this.prisma.user.findMany({});
  }

  async findOne(id: number) {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          id: id,
        },
      });
      return JSON.stringify(user);
    } catch (error) {
      return JSON.stringify(error);
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      const user = await this.prisma.user.update({
        where: {
          id: id,
        },
        data: {
          name: updateUserDto.name,
          email: updateUserDto.email,
          password: updateUserDto.password,
        },
      });
      return JSON.stringify(user);
    } catch (error) {
      return JSON.stringify(error);
    }
  }

  async remove(id: number) {
    try {
      const user = await this.prisma.user.delete({
        where: {
          id: id,
        },
      });
      return JSON.stringify(user);
    } catch (error) {
      return JSON.stringify(error);
    }
  }

  async validateUser(email: string, password: string) {
    try {
      const user = await this.prisma.user.findUnique({
        select: {
          email: true,
          role: true,
          password: true,
        },
        where: {
          email: email,
        },
      });
      if (user && (await bcrypt.compare(password, user.password))) {
        return user;
      }
      return null;
    } catch (error) {
      return JSON.stringify(error);
    }
  }
}
