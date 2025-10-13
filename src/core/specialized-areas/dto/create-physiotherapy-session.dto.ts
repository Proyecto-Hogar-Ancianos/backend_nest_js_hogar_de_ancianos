export class CreatePhysiotherapySessionDto {
  date: Date;
  type: string;
  mobilityLevel: string;
  painLevel?: number;
  treatmentDescription: string;
  exercisePlan: string;
  progressNotes: string;
  appointmentId: number;
}
