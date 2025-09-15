import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';
import { LocationService } from './location.service';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';

@ApiTags('locations')
@Controller('location')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Post()
  @ApiOperation({ summary: 'Crear una nueva ubicación' })
  @ApiBody({ type: CreateLocationDto })
  @ApiResponse({ status: 201, description: 'Ubicación creada exitosamente' })
  @ApiResponse({ status: 400, description: 'Error en los datos proporcionados' })
  create(@Body() createLocationDto: CreateLocationDto) {
    return this.locationService.create(createLocationDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todas las ubicaciones' })
  @ApiResponse({ status: 200, description: 'Lista de ubicaciones obtenida exitosamente' })
  findAll() {
    return this.locationService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una ubicación por ID' })
  @ApiParam({ name: 'id', description: 'ID de la ubicación' })
  @ApiResponse({ status: 200, description: 'Ubicación encontrada exitosamente' })
  @ApiResponse({ status: 404, description: 'Ubicación no encontrada' })
  findOne(@Param('id') id: string) {
    return this.locationService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar una ubicación' })
  @ApiParam({ name: 'id', description: 'ID de la ubicación a actualizar' })
  @ApiBody({ type: UpdateLocationDto })
  @ApiResponse({ status: 200, description: 'Ubicación actualizada exitosamente' })
  @ApiResponse({ status: 404, description: 'Ubicación no encontrada' })
  update(@Param('id') id: string, @Body() updateLocationDto: UpdateLocationDto) {
    return this.locationService.update(+id, updateLocationDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una ubicación' })
  @ApiParam({ name: 'id', description: 'ID de la ubicación a eliminar' })
  @ApiResponse({ status: 200, description: 'Ubicación eliminada exitosamente' })
  @ApiResponse({ status: 404, description: 'Ubicación no encontrada' })
  remove(@Param('id') id: string) {
    return this.locationService.remove(+id);
  }
}
