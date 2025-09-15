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
import { LocationService } from './location.service';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import type { Response } from 'express';

@ApiTags('locations')
@Controller('location')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Post()
  @ApiOperation({ summary: 'Crear una nueva ubicación' })
  @ApiBody({ type: CreateLocationDto })
  @ApiResponse({ status: 201, description: 'Ubicación creada exitosamente' })
  @ApiResponse({
    status: 400,
    description: 'Error en los datos proporcionados',
  })
  async create(
    @Body() createLocationDto: CreateLocationDto,
    @Res() res: Response
  ) {
    const location = await this.locationService.create(createLocationDto);
    res.status(HttpStatus.CREATED).json({
      message: 'Ubicación creada con éxito',
      status: HttpStatus.CREATED,
      data: location,
    });
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todas las ubicaciones' })
  @ApiResponse({
    status: 200,
    description: 'Lista de ubicaciones obtenida exitosamente',
  })
  async findAll(@Res() res: Response) {
    const locations = await this.locationService.findAll();
    res.status(HttpStatus.OK).json({
      message: 'Ubicaciones obtenidas con éxito',
      status: HttpStatus.OK,
      data: locations,
    });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una ubicación por ID' })
  @ApiParam({ name: 'id', description: 'ID de la ubicación' })
  @ApiResponse({
    status: 200,
    description: 'Ubicación encontrada exitosamente',
  })
  async findOne(@Param('id') id: string, @Res() res: Response) {
    const location = await this.locationService.findOne(+id);
    res.status(HttpStatus.OK).json({
      message: 'Ubicación obtenida con éxito',
      status: HttpStatus.OK,
      data: location,
    });
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar una ubicación' })
  @ApiParam({ name: 'id', description: 'ID de la ubicación a actualizar' })
  @ApiBody({ type: UpdateLocationDto })
  @ApiResponse({
    status: 200,
    description: 'Ubicación actualizada exitosamente',
  })
  @ApiResponse({ status: 404, description: 'Ubicación no encontrada' })
  async update(
    @Param('id') id: string,
    @Res() res: Response,
    @Body() updateLocationDto: UpdateLocationDto
  ) {
    const location = await this.locationService.update(+id, updateLocationDto);
    res.status(HttpStatus.OK).json({
      message: 'Ubicación actualizada con éxito',
      status: HttpStatus.OK,
      data: location,
    });
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una ubicación' })
  @ApiParam({ name: 'id', description: 'ID de la ubicación a eliminar' })
  @ApiResponse({ status: 200, description: 'Ubicación eliminada exitosamente' })
  @ApiResponse({ status: 404, description: 'Ubicación no encontrada' })
  async remove(@Param('id') id: string, @Res() res: Response) {
    const location = await this.locationService.remove(+id);
    res.status(HttpStatus.OK).json({
      message: 'Ubicación eliminada con éxito',
      status: HttpStatus.OK,
      data: location,
    });
  }
}
