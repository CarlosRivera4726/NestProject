import { Module } from '@nestjs/common';
import { InspectionService } from './inspection.service';
import { InspectionController } from './inspection.controller';

@Module({
  controllers: [InspectionController],
  providers: [InspectionService],
})
export class InspectionModule {}
