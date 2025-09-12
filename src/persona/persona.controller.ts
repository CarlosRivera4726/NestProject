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
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';
import { PersonaService } from './persona.service';
import { CreatePersonaDto } from './dto/create-persona.dto';
import { UpdatePersonaDto } from './dto/update-persona.dto';
import type { Response } from 'express';
import { CreateLocationDto } from 'src/location/dto/create-location.dto';
import { PersonaRol } from '@prisma/client';

@ApiTags('personas')
@Controller('persona')
export class PersonaController {
  constructor(private readonly personaService: PersonaService) {}

  @Post()
  @ApiOperation({ summary: 'Crear una nueva persona' })
  @ApiBody({ type: CreatePersonaDto })
  @ApiResponse({ status: 201, description: 'Persona creada exitosamente' })
  @ApiResponse({
    status: 400,
    description: 'Error en los datos proporcionados',
  })
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
  @ApiOperation({
    summary: 'Obtener todas las ubicaciones (solo admin/developer)',
  })
  @ApiBody({
    schema: { type: 'object', properties: { role: { type: 'string' } } },
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de ubicaciones obtenida exitosamente',
  })
  @ApiResponse({
    status: 403,
    description: 'Acceso denegado - rol insuficiente',
  })
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
  @ApiOperation({ summary: 'Crear una nueva ubicación (solo admin/developer)' })
  @ApiBody({ type: CreateLocationDto })
  @ApiResponse({ status: 201, description: 'Ubicación creada exitosamente' })
  @ApiResponse({
    status: 401,
    description: 'No tienes permisos para crear ubicaciones',
  })
  async createLocation(
    @Body() body: CreateLocationDto,
    @Res({ passthrough: true }) res: Response
  ) {
    if (
      body.role === ('ADMIN' as PersonaRol) ||
      body.role === ('DEVELOPER' as PersonaRol)
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
  @ApiOperation({ summary: 'Obtener todas las personas' })
  @ApiResponse({
    status: 200,
    description: 'Lista de personas obtenida exitosamente',
  })
  findAll() {
    return this.personaService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una persona por ID' })
  @ApiParam({ name: 'id', description: 'ID de la persona' })
  @ApiResponse({ status: 200, description: 'Persona encontrada exitosamente' })
  @ApiResponse({ status: 404, description: 'Persona no encontrada' })
  findOne(@Param('id') id: string) {
    return this.personaService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar una persona' })
  @ApiParam({ name: 'id', description: 'ID de la persona a actualizar' })
  @ApiBody({ type: UpdatePersonaDto })
  @ApiResponse({ status: 200, description: 'Persona actualizada exitosamente' })
  @ApiResponse({ status: 404, description: 'Persona no encontrada' })
  update(@Param('id') id: string, @Body() updatePersonaDto: UpdatePersonaDto) {
    return this.personaService.update(+id, updatePersonaDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una persona' })
  @ApiParam({ name: 'id', description: 'ID de la persona a eliminar' })
  @ApiResponse({ status: 200, description: 'Persona eliminada exitosamente' })
  @ApiResponse({ status: 404, description: 'Persona no encontrada' })
  remove(@Param('id') id: string) {
    return this.personaService.remove(+id);
  }
}
