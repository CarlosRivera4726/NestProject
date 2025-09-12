import { PartialType } from '@nestjs/swagger';
import { CreateInspectorDto } from './create-inspector.dto';

export class UpdateInspectorDto extends PartialType(CreateInspectorDto) {}
