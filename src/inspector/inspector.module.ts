import { Module } from '@nestjs/common';
import { InspectorService } from './inspector.service';
import { InspectorController } from './inspector.controller';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [InspectorController],
  providers: [InspectorService, PrismaService],
})
export class InspectorModule {}
