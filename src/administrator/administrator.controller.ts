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
import { AdministratorService } from './administrator.service';
import { CreateAdministratorDto } from './dto/create-administrator.dto';
import { UpdateAdministratorDto } from './dto/update-administrator.dto';

@ApiTags('administrator')
@Controller('administrator')
export class AdministratorController {
  constructor(private readonly administratorService: AdministratorService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo administrador' })
  @ApiBody({ type: CreateAdministratorDto })
  @ApiResponse({ status: 201, description: 'Administrador creado exitosamente' })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  create(@Body() createAdministratorDto: CreateAdministratorDto) {
    return this.administratorService.create(createAdministratorDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los administradores' })
  @ApiResponse({ status: 200, description: 'Lista de administradores obtenida exitosamente' })
  findAll() {
    return this.administratorService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un administrador por ID' })
  @ApiParam({ name: 'id', description: 'ID del administrador', type: 'number' })
  @ApiResponse({ status: 200, description: 'Administrador encontrado exitosamente' })
  @ApiResponse({ status: 404, description: 'Administrador no encontrado' })
  findOne(@Param('id') id: string) {
    return this.administratorService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un administrador' })
  @ApiParam({ name: 'id', description: 'ID del administrador', type: 'number' })
  @ApiBody({ type: UpdateAdministratorDto })
  @ApiResponse({ status: 200, description: 'Administrador actualizado exitosamente' })
  @ApiResponse({ status: 404, description: 'Administrador no encontrado' })
  update(
    @Param('id') id: string,
    @Body() updateAdministratorDto: UpdateAdministratorDto
  ) {
    return this.administratorService.update(+id, updateAdministratorDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un administrador' })
  @ApiParam({ name: 'id', description: 'ID del administrador', type: 'number' })
  @ApiResponse({ status: 200, description: 'Administrador eliminado exitosamente' })
  @ApiResponse({ status: 404, description: 'Administrador no encontrado' })
  remove(@Param('id') id: string) {
    return this.administratorService.remove(+id);
  }
}
