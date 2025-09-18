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
  async update(
    @Param('id') id: string,
    @Body() updatePersonaDto: UpdatePersonaDto,
    @Res() res: Response
  ) {
    try {
      const persona = await this.personaService.update(+id, updatePersonaDto);
      res.status(HttpStatus.OK).json({
        message: 'Persona actualizada con éxito',
        status: HttpStatus.OK,
        data: persona,
      });
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error al actualizar la persona',
        status: HttpStatus.BAD_REQUEST,
        data: error,
      });
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una persona' })
  @ApiParam({ name: 'id', description: 'ID de la persona a eliminar' })
  @ApiResponse({ status: 200, description: 'Persona eliminada exitosamente' })
  @ApiResponse({ status: 404, description: 'Persona no encontrada' })
  async remove(@Param('id') id: string, @Res() res: Response) {
    try {
      const persona = await this.personaService.remove(+id);
      res.status(HttpStatus.OK).json({
        message: 'Persona eliminada con éxito',
        status: HttpStatus.OK,
        data: persona,
      });
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error al eliminar la persona',
        status: HttpStatus.BAD_REQUEST,
        data: error,
      });
    }
  }
}
