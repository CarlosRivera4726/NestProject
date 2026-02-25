import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CreatePersonaDto } from '../../persona/dto/create-persona.dto';

export class CreateInspectorDto extends CreatePersonaDto {
  @ApiProperty({
    description: 'ID de la persona que será inspector',
    example: 1,
  })
  @IsNumber()
  personaId: number;

  @ApiProperty({
    description: 'ID de la ubicación a inspeccionar',
    example: 1,
  })
  @IsNumber()
  locationId: number;

  @ApiProperty({
    description: 'Apellido del inspector',
    example: 'Rivera',
  })
  lastName: string;
}
