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
import { InspectorService } from './inspector.service';
import { CreateInspectorDto } from './dto/create-inspector.dto';
import { UpdateInspectorDto } from './dto/update-inspector.dto';

@ApiTags('inspectors')
@Controller('inspector')
export class InspectorController {
  constructor(private readonly inspectorService: InspectorService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo inspector' })
  @ApiBody({ type: CreateInspectorDto })
  @ApiResponse({ status: 201, description: 'Inspector creado exitosamente' })
  @ApiResponse({
    status: 400,
    description: 'Error en los datos proporcionados',
  })
  async create(@Body() createInspectorDto: CreateInspectorDto) {
    return await this.inspectorService.create(createInspectorDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los inspectores' })
  @ApiResponse({
    status: 200,
    description: 'Lista de inspectores obtenida exitosamente',
  })
  async findAll() {
    return await this.inspectorService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un inspector por ID' })
  @ApiParam({ name: 'id', description: 'ID del inspector' })
  @ApiResponse({
    status: 200,
    description: 'Inspector encontrado exitosamente',
  })
  @ApiResponse({ status: 404, description: 'Inspector no encontrado' })
  async findOne(@Param('id') id: string) {
    return await this.inspectorService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un inspector' })
  @ApiParam({ name: 'id', description: 'ID del inspector a actualizar' })
  @ApiBody({ type: UpdateInspectorDto })
  @ApiResponse({
    status: 200,
    description: 'Inspector actualizado exitosamente',
  })
  @ApiResponse({ status: 404, description: 'Inspector no encontrado' })
  async update(
    @Param('id') id: string,
    @Body() updateInspectorDto: UpdateInspectorDto
  ) {
    return await this.inspectorService.update(+id, updateInspectorDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un inspector' })
  @ApiParam({ name: 'id', description: 'ID del inspector a eliminar' })
  @ApiResponse({ status: 200, description: 'Inspector eliminado exitosamente' })
  @ApiResponse({ status: 404, description: 'Inspector no encontrado' })
  async remove(@Param('id') id: string) {
    return await this.inspectorService.remove(+id);
  }
}
