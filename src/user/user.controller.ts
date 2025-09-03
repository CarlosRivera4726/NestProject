import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import type { Response } from 'express';
import { CreateLocationDto } from 'src/location/dto/create-location.dto';
import { UserRol } from '@prisma/client';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto);
  }

  @Get('getAllLocations')
  async getAllLocations(
    @Body() body: { role: string },
    @Res({ passthrough: true }) res: Response
  ) {
    if (body.role === 'admin' || body.role === 'developer') {
      return await this.userService.findAllLocations();
    }
    res
      .status(HttpStatus.UNAUTHORIZED)
      .json({ message: 'No tienes permisos', status: HttpStatus.UNAUTHORIZED });
  }

  @Post('createLocation')
  async createLocation(
    @Body() body: CreateLocationDto,
    @Res({ passthrough: true }) res: Response
  ) {
    if (
      body.role?.toUpperCase() === ('ADMIN' as UserRol) ||
      body.role?.toUpperCase() === ('DEVELOPER' as UserRol)
    ) {
      const { name, coordinates, status } = body;
      const location = {
        name,
        coordinates,
        status,
      };
      return await this.userService.createLocation(location);
    }
    res
      .status(HttpStatus.UNAUTHORIZED)
      .json({ message: 'No tienes permisos', status: HttpStatus.UNAUTHORIZED });
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
