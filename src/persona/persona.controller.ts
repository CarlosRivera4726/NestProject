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
import { PersonaService } from './persona.service';
import { CreatePersonaDto } from './dto/create-persona.dto';
import { UpdatePersonaDto } from './dto/update-persona.dto';
import type { Response } from 'express';
import { CreateLocationDto } from 'src/location/dto/create-location.dto';
import { PersonaRol } from '@prisma/client';

@Controller('persona')
export class PersonaController {
  constructor(private readonly personaService: PersonaService) {}

  @Post()
  async create(
    @Body() createPersonaDto: CreatePersonaDto,
    @Res() res: Response
  ) {
    try {
      const persona = await this.personaService.create(createPersonaDto);
      res.status(HttpStatus.CREATED).json({
        message: 'Persona creada con éxito',
        status: HttpStatus.CREATED,
        data: persona,
      });
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error al crear la persona',
        status: HttpStatus.BAD_REQUEST,
        data: error,
      });
    }
  }

  @Get('getAllLocations')
  async getAllLocations(
    @Body() body: { role: string },
    @Res({ passthrough: true }) res: Response
  ) {
    if (body.role === 'admin' || body.role === 'developer') {
      return await this.personaService.findAllLocations();
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
      body.role?.toUpperCase() === ('ADMIN' as PersonaRol) ||
      body.role?.toUpperCase() === ('DEVELOPER' as PersonaRol)
    ) {
      const { name, coordinates, status } = body;
      const location = {
        name,
        coordinates,
        status,
      };
      return await this.personaService.createLocation(location);
    }
    res
      .status(HttpStatus.UNAUTHORIZED)
      .json({ message: 'No tienes permisos', status: HttpStatus.UNAUTHORIZED });
  }

  @Get()
  findAll() {
    return this.personaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.personaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePersonaDto: UpdatePersonaDto) {
    return this.personaService.update(+id, updatePersonaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.personaService.remove(+id);
  }
}
