import { IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUsuarioDto {
  @ApiProperty({
    description: 'ID de la persona que será usuario',
    example: 1,
    type: 'number',
  })
  @IsNumber({}, { message: 'El id de la persona debe ser un número' })
  @IsNotEmpty({ message: 'El id de la persona no puede estar vacío' })
  personaId: number;
}
