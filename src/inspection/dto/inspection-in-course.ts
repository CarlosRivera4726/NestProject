import { InspectionStatus } from 'src/enum/Status';
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
    status: InspectionStatus
  ): Promise<void> {
    console.log(inspectionId, status);
    throw new Error('Method not implemented.');
  }
}
