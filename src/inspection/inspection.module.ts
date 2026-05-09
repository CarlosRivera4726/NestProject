import { Module } from '@nestjs/common';
import { InspectionService } from './inspection.service';
import { InspectionController } from './inspection.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [InspectionController],
  providers: [InspectionService, PrismaService],
})
export class InspectionModule { }
