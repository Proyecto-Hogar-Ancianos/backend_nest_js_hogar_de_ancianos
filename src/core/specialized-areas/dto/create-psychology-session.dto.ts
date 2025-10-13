export class CreatePsychologySessionDto {
  date: Date;
  sessionType: string;
  notes?: string;
  appointmentId: number;
}
