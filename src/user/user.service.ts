import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  async create(createUserDto: CreateUserDto) {
    try {
      const user = await this.prisma.user.create({
        data: {
          name: createUserDto.name,
          email: createUserDto.email,
          password: createUserDto.password,
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
}
