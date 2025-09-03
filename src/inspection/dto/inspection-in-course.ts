import { StatusInspection } from '@prisma/client';
import { Inspection } from '../entities/inspection.entity';

export class InspectionInCourse extends Inspection {
  async getInspectionsInCourse(): Promise<Inspection[]> {
    throw new Error('Method not implemented.');
  }

  async getOneInspectionInCourse(): Promise<Inspection> {
    throw new Error('Method not implemented');
  }
  async changeInspectionStatus(
    inspectionId: number,
    status: StatusInspection
  ): Promise<void> {
    console.log(inspectionId, status);
    throw new Error('Method not implemented.');
  }
}
