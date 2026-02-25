import { IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CreatePersonaDto } from '../../persona/dto/create-persona.dto';

export class CreateUsuarioDto extends CreatePersonaDto {
  @ApiProperty({
    description: 'ID de la persona que será usuario',
    example: 1,
    type: 'number',
  })
  @IsNumber({}, { message: 'El id de la persona debe ser un número' })
  @IsNotEmpty({ message: 'El id de la persona no puede estar vacío' })
  personaId: number;

  @ApiProperty({
    description: 'Apellido del usuario',
    example: 'Perez',
  })
  @IsNotEmpty({ message: 'El apellido del usuario no puede estar vacío' })
  lastName: string;
}
