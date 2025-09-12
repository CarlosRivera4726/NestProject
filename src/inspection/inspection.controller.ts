import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';
import { InspectionService } from './inspection.service';
import { CreateInspectionDto } from './dto/create-inspection.dto';
import { UpdateInspectionDto } from './dto/update-inspection.dto';

@ApiTags('inspections')
@Controller('inspection')
export class InspectionController {
  constructor(private readonly inspectionService: InspectionService) {}

  @Post()
  @ApiOperation({ summary: 'Crear una nueva inspección' })
  @ApiBody({ type: CreateInspectionDto })
  @ApiResponse({ status: 201, description: 'Inspección creada exitosamente' })
  @ApiResponse({
    status: 400,
    description: 'Error en los datos proporcionados',
  })
  create(@Body() createInspectionDto: CreateInspectionDto) {
    return this.inspectionService.create(createInspectionDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todas las inspecciones' })
  @ApiResponse({
    status: 200,
    description: 'Lista de inspecciones obtenida exitosamente',
  })
  findAll() {
    return this.inspectionService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una inspección por ID' })
  @ApiParam({ name: 'id', description: 'ID de la inspección' })
  @ApiResponse({
    status: 200,
    description: 'Inspección encontrada exitosamente',
  })
  @ApiResponse({ status: 404, description: 'Inspección no encontrada' })
  findOne(@Param('id') id: string) {
    return this.inspectionService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar una inspección' })
  @ApiParam({ name: 'id', description: 'ID de la inspección a actualizar' })
  @ApiBody({ type: UpdateInspectionDto })
  @ApiResponse({
    status: 200,
    description: 'Inspección actualizada exitosamente',
  })
  @ApiResponse({ status: 404, description: 'Inspección no encontrada' })
  update(
    @Param('id') id: string,
    @Body() updateInspectionDto: UpdateInspectionDto
  ) {
    return this.inspectionService.update(+id, updateInspectionDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una inspección' })
  @ApiParam({ name: 'id', description: 'ID de la inspección a eliminar' })
  @ApiResponse({
    status: 200,
    description: 'Inspección eliminada exitosamente',
  })
  @ApiResponse({ status: 404, description: 'Inspección no encontrada' })
  remove(@Param('id') id: string) {
    return this.inspectionService.remove(+id);
  }
}
